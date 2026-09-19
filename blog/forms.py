from django import forms
from .models import Comment
from .models import ContactMessage
from .models import Newsletter
from django.core.validators import RegexValidator



from django import forms
from django.core.validators import RegexValidator
from .models import ContactMessage

class ContactForm(forms.ModelForm):
    phone = forms.CharField(
        max_length=16,
        validators=[
            RegexValidator(
                regex=r'^\+98\s\d{3}\s\d{3}\s\d{4}$',
                message="شماره تلفن باید در قالب +98 912 345 6789 وارد شود.",
            )
        ],
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "+98 912 345 6789",
                "value": "+98 ",
                "dir": "ltr"
            }
        ),
        label="شماره تلفن",
    )


    class Meta:
        model = ContactMessage
        fields = ["name", "email", "phone", "subject", "message"]
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "نام کامل خود را وارد کنید",
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "ایمیل خود را وارد کنید",
                }
            ),
            "subject": forms.Select(attrs={"class": "form-control"}),
            "message": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "rows": 6,
                    "placeholder": "پیام خود را اینجا بنویسید...",
                }
            ),
        }
        labels = {
            "name": "نام و نام خانوادگی",
            "email": "ایمیل",
            "phone": "شماره تلفن",
            "subject": "موضوع",
            "message": "پیام",
        }



class NewsletterForm(forms.ModelForm):
    class Meta:
        model = Newsletter
        fields = ["email"]
        widgets = {
            "email": forms.EmailInput(
                attrs={"class": "form-control", "placeholder": "ایمیل شما"}
            ),
        }
        labels = {"email": ""}



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ["name", "email", "content"]
        widgets = {
            "name": forms.TextInput(
                attrs={"class": "form-control", "placeholder": "نام شما"}
            ),
            "email": forms.EmailInput(
                attrs={"class": "form-control", "placeholder": "ایمیل شما"}
            ),
            "content": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "rows": 4,
                    "placeholder": "متن کامنت شما...",
                }
            ),
        }
        labels = {
            "name": "نام",
            "email": "ایمیل",
            "content": "متن کامنت",
        }


class SearchForm(forms.Form):
    q = forms.CharField(
        max_length=200,
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "جستجو در پست‌ها..."}
        ),
    )
