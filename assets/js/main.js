(function () {
  const STORAGE_KEY = "djangozane-clean-theme";
  const html = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === "dark" ? "#1e1e2e" : "#eff1f5";
    }
  }

  function getEffectiveTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || getSystemTheme();
  }

  applyTheme(getEffectiveTheme());

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block .copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var block = btn.closest(".code-block");
        var code = block.querySelector("code");
        if (!code) return;
        var text = code.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add("copied");
          setTimeout(function () {
            btn.classList.remove("copied");
          }, 2000);
        });
      });
    });
    // 移动端文章标题切换
    (function () {
      var mq = window.matchMedia("(max-width: 480px)");
      var siteTitle = document.getElementById("site-title");
      var articleEl = document.getElementById("site-title-article");
      var articleH1 = document.querySelector(".article-header h1");
      if (!siteTitle || !articleEl || !articleH1) return;

      articleEl.textContent = articleH1.textContent;
      var observer = null;

      function setup() {
        if (!mq.matches) {
          if (observer) { observer.disconnect(); observer = null; }
          siteTitle.classList.remove("show-article");
          return;
        }
        if (observer) return;
        observer = new IntersectionObserver(
          function (entries) {
            siteTitle.classList.toggle("show-article", !entries[0].isIntersecting);
          },
          { threshold: 0 }
        );
        observer.observe(articleH1);
      }

      setup();
      mq.addEventListener("change", setup);
    })();

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      });
    }

    const menuToggle = document.getElementById("menu-toggle");
    const siteNav = document.getElementById("site-nav");
    if (menuToggle && siteNav) {
      menuToggle.addEventListener("click", function () {
        siteNav.classList.toggle("open");
        const expanded = siteNav.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", String(expanded));
      });

      document.addEventListener("click", function (e) {
        if (!menuToggle.contains(e.target) && !siteNav.contains(e.target)) {
          siteNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(getSystemTheme());
      }
    });
})();
