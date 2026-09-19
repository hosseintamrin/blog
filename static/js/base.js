document.addEventListener("DOMContentLoaded", function () {
  // ---------- Alerts auto-hide ----------
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    setTimeout(() => {
      alert.style.opacity = "0";
      alert.style.transform = "translateY(-20px)";
      setTimeout(() => {
        alert.remove();
      }, 300);
    }, 5000);
  });

  // ---------- Smooth anchor scroll ----------
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---------- Enhanced search form ----------
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    const searchInput = searchForm.querySelector('input[name="q"]');
    const searchBtn = searchForm.querySelector("button");
    if(searchInput && searchBtn){
      searchInput.addEventListener("focus", function () {
        this.style.borderColor = "var(--accent-primary)";
        searchBtn.style.color = "var(--accent-primary)";
      });
      searchInput.addEventListener("blur", function () {
        if (!this.value) {
          this.style.borderColor = "var(--border-primary)";
          searchBtn.style.color = "var(--text-muted)";
        }
      });
    }
  }

  // ---------- Back to top button ----------
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.className = "btn btn-primary back-to-top";
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    display: none;
    transition: all 0.3s ease;
  `;
  backToTopButton.setAttribute("aria-label", "بازگشت به بالا");
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", function () {
    const scrollY = window.pageYOffset;
    if (scrollY > 300) {
      backToTopButton.style.display = "block";
      setTimeout(() => { backToTopButton.style.opacity = "1"; }, 10);
    } else {
      backToTopButton.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) backToTopButton.style.display = "none";
      }, 300);
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- Form submission loading ----------
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn && !submitBtn.disabled) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>در حال ارسال...';
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 5000);
      }
    });
  });

  // ---------- Card fade-in ----------
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => observer.observe(card));

  // ---------- Keyboard support ----------
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const alerts = document.querySelectorAll(".alert");
      alerts.forEach((alert) => {
        const closeBtn = alert.querySelector(".btn-close");
        if (closeBtn) closeBtn.click();
      });
    }
  });

  // ---------- Navbar toggler animation ----------
  const toggler = document.getElementById("navbar-toggler");
  const navbarCollapse = document.getElementById("navbarNav");
  if (navbarCollapse && toggler) {
    navbarCollapse.addEventListener("show.bs.collapse", () => toggler.classList.add("open"));
    navbarCollapse.addEventListener("hide.bs.collapse", () => toggler.classList.remove("open"));
  }

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if(themeToggle && themeIcon){
    if (localStorage.getItem("theme") === "light") {
      root.classList.add("light-theme");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggle.addEventListener("click", () => {
      themeIcon.classList.add("rotate");
      setTimeout(() => {
        themeIcon.classList.remove("rotate");
        if (root.classList.contains("light-theme")) {
          root.classList.remove("light-theme");
          themeIcon.classList.replace("fa-sun", "fa-moon");
          localStorage.setItem("theme", "dark");
        } else {
          root.classList.add("light-theme");
          themeIcon.classList.replace("fa-moon", "fa-sun");
          localStorage.setItem("theme", "light");
        }
      }, 300);
    });
  }

  // ---------- Navbar & Floating theme toggle ----------
  const navbarToggle = document.getElementById("navbar-theme-toggle");
  const navbarIcon = document.getElementById("navbar-theme-icon");
  const floatingToggle = document.getElementById("floating-theme-toggle");
  const floatingIcon = document.getElementById("floating-theme-icon");
  const backToTop = document.getElementById("back-to-top");

  // Initialize theme
  if(navbarIcon && floatingIcon){
    if(localStorage.getItem("theme") === "light"){
      document.documentElement.classList.add("light-theme");
      navbarIcon.className = "fas fa-sun";
      navbarIcon.style.left = "32px";
      floatingIcon.className = "fas fa-sun";
    } else {
      document.documentElement.classList.remove("light-theme");
      navbarIcon.className = "fas fa-moon";
      navbarIcon.style.left = "5px";
      floatingIcon.className = "fas fa-moon";
    }
  }

  // Scroll events for floating toggle & back-to-top
  window.addEventListener("scroll", function(){
    const scrollY = window.pageYOffset;

    if(floatingToggle && floatingIcon){
      if(scrollY > 300){
        floatingToggle.style.display = "flex";
        setTimeout(()=> floatingToggle.style.opacity = "1", 10);
      } else {
        floatingToggle.style.opacity = "0";
        setTimeout(()=> { if(scrollY <= 3) floatingToggle.style.display = "none"; }, 300);
      }
    }

    if(backToTop){
      if(scrollY > 300){
        backToTop.style.display = "flex";
        setTimeout(()=> backToTop.style.opacity = "1", 10);
      } else {
        backToTop.style.opacity = "0";
        setTimeout(()=> { if(scrollY <= 300) backToTop.style.display = "none"; }, 300);
      }
    }
  });

  // Navbar toggle function
  function toggleNavbarTheme(){
    if(navbarIcon && floatingIcon){
      const isLight = document.documentElement.classList.toggle("light-theme");

      if(isLight){
        localStorage.setItem("theme","light");
        navbarIcon.className = "fas fa-sun";
        navbarIcon.style.left = "32px";
        floatingIcon.className = "fas fa-sun";
      } else {
        localStorage.setItem("theme","dark");
        navbarIcon.className = "fas fa-moon";
        navbarIcon.style.left = "5px";
        floatingIcon.className = "fas fa-moon";
      }

      navbarIcon.classList.add("rotate");
      setTimeout(()=> navbarIcon.classList.remove("rotate"), 500);
    }
  }

  // Floating toggle function
  function toggleFloatingTheme(){
    if(navbarIcon && floatingIcon){
      const isLight = document.documentElement.classList.toggle("light-theme");

      if(isLight){
        localStorage.setItem("theme","light");
        floatingIcon.className = "fas fa-sun";
      } else {
        localStorage.setItem("theme","dark");
        floatingIcon.className = "fas fa-moon";
      }

      floatingIcon.classList.add("rotate");
      setTimeout(()=> floatingIcon.classList.remove("rotate"), 500);

      // Sync navbar
      if(isLight){
        navbarIcon.className = "fas fa-sun";
        navbarIcon.style.left = "32px";
      } else {
        navbarIcon.className = "fas fa-moon";
        navbarIcon.style.left = "5px";
      }
    }
  }

  // Event listeners
  if(navbarToggle) navbarToggle.addEventListener("click", toggleNavbarTheme);
  if(floatingToggle) floatingToggle.addEventListener("click", toggleFloatingTheme);
  if(backToTop) backToTop.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
});