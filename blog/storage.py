import os

from django.core.files.base import ContentFile
from django.core.files.storage import Storage
from vercel.blob import BlobClient


class VercelBlobStorage(Storage):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.token = os.getenv("BLOB_READ_WRITE_TOKEN")

        if not self.token:
            raise RuntimeError(
                "BLOB_READ_WRITE_TOKEN is not configured."
            )

        self.client = BlobClient(token=self.token)

    def _save(self, name, content):
        name = name.replace("\\", "/").lstrip("/")

        file_data = content.read()

        content_type = getattr(
            content,
            "content_type",
            None,
        )

        blob = self.client.put(
            name,
            file_data,
            access="public",
            add_random_suffix=True,
            content_type=content_type,
        )

        return blob.pathname

    def url(self, name):
        return self.client.head(
            name,
            token=self.token,
        ).url

    def exists(self, name):
        try:
            self.client.head(
                name,
                token=self.token,
            )
            return True
        except Exception:
            return False

    def delete(self, name):
        self.client.delete(
            name,
            token=self.token,
        )

    def _open(self, name, mode="rb"):
        result = self.client.get(
            name,
            access="public",
            token=self.token,
        )

        if result is None:
            raise FileNotFoundError(name)

        data = b""

        for chunk in result.stream:
            data += chunk

        return ContentFile(data, name=name)

    def size(self, name):
        result = self.client.head(
            name,
            token=self.token,
        )

        return result.size
