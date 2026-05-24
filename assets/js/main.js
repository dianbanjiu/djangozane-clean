(function () {
  const STORAGE_KEY = "djangozane-clean-theme";
  const html = document.documentElement;

  function themeT(key, fallback) {
    var o = window.__THEME_I18N__ || {};
    return o[key] || fallback || "";
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = theme === "dark" ? "#0a0a0a" : "#ffffff";
    }
  }

  function getEffectiveTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || getSystemTheme();
  }

  applyTheme(getEffectiveTheme());

  document.addEventListener("DOMContentLoaded", function () {
    // Copy buttons
    document.querySelectorAll(".code-block .copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var block = btn.closest(".code-block");
        var code = block.querySelector("code");
        if (!code) return;
        var text = code.textContent;
        btn.removeAttribute("data-copy-error");
        navigator.clipboard.writeText(text).then(function () {
          btn.classList.add("copied");
          setTimeout(function () {
            btn.classList.remove("copied");
          }, 2000);
        }).catch(function () {
          var msg = themeT("copyFailed", "Could not copy");
          btn.setAttribute("data-copy-error", "1");
          btn.setAttribute("title", msg);
          setTimeout(function () {
            btn.removeAttribute("data-copy-error");
            btn.removeAttribute("title");
          }, 4000);
        });
      });
    });

    // Mobile article title swap
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

    // Theme toggle
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
      });
    }

    // Mobile menu
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

    // Search overlay
    var overlay = document.getElementById("search-overlay");
    if (!overlay) return;

    var backdrop = document.getElementById("search-overlay-backdrop");
    var input = document.getElementById("search-overlay-input");
    var resultsEl = document.getElementById("search-overlay-results");
    var openBtn = document.getElementById("search-open");
    var openBtnMobile = document.getElementById("search-open-mobile");
    var pagefind = null;
    var debounceTimer = null;
    var activeIndex = -1;

    var pagefindPromise = null;
    function loadPagefind(cb) {
      if (pagefind) return cb();
      if (!pagefindPromise) {
        pagefindPromise = import("/pagefind/pagefind.js").then(function (mod) {
          pagefind = mod;
          if (pagefind.init) pagefind.init();
          return pagefind;
        }).catch(function () {
          pagefindPromise = null;
        });
      }
      pagefindPromise.then(function () { if (pagefind) cb(); });
    }

    function openSearch() {
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("search-open");
      input.value = "";
      activeIndex = -1;
      if (!pagefind) {
        resultsEl.innerHTML =
          '<div class="search-overlay-empty search-overlay-loading">' +
          themeT("searchLoading", "Loading…") +
          "</div>";
      } else {
        resultsEl.innerHTML = "";
      }
      setTimeout(function () { input.focus(); }, 50);
      loadPagefind(function () {
        if (!input.value.trim()) {
          resultsEl.innerHTML = "";
        }
      });
    }

    function closeSearch() {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("search-open");
      activeIndex = -1;
    }

    if (openBtn) openBtn.addEventListener("click", openSearch);
    if (openBtnMobile) openBtnMobile.addEventListener("click", function () {
      if (siteNav) siteNav.classList.remove("open");
      openSearch();
    });

    backdrop.addEventListener("click", closeSearch);

    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !overlay.classList.contains("open")) {
        var tag = (e.target.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
        e.preventDefault();
        openSearch();
        return;
      }
      if (e.key === "Escape" && overlay.classList.contains("open")) {
        closeSearch();
        return;
      }
      if (!overlay.classList.contains("open")) return;
      var items = resultsEl.querySelectorAll(".search-overlay-item");
      if (!items.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateActive(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateActive(items);
      } else if (e.key === "Enter" && activeIndex >= 0 && items[activeIndex]) {
        e.preventDefault();
        items[activeIndex].click();
      }
    });

    function updateActive(items) {
      items.forEach(function (el, i) {
        el.classList.toggle("active", i === activeIndex);
      });
      if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].scrollIntoView({ block: "nearest" });
      }
    }

    function doSearch(query) {
      if (!query.trim()) {
        resultsEl.innerHTML = "";
        activeIndex = -1;
        return;
      }
      if (!pagefind) {
        resultsEl.innerHTML =
          '<div class="search-overlay-empty search-overlay-loading">' +
          themeT("searchLoading", "Loading…") +
          "</div>";
      }
      loadPagefind(function () {
        if (!pagefind) return;
        pagefind.search(query).then(function (search) {
          if (input.value.trim() !== query.trim()) return;
          if (!search.results.length) {
            resultsEl.innerHTML =
              '<div class="search-overlay-empty">' +
              themeT("searchNoResults", "No results found") +
              "</div>";
            activeIndex = -1;
            return;
          }
          var toShow = search.results.slice(0, 8);
          Promise.all(toShow.map(function (r) { return r.data(); })).then(function (dataArr) {
            if (input.value.trim() !== query.trim()) return;
            var html = "";
            dataArr.forEach(function (d) {
              html += '<a class="search-overlay-item" href="' + d.url + '">' +
                '<div class="search-overlay-item-title">' + escapeHtml(d.meta.title || d.url) + '</div>' +
                '<div class="search-overlay-item-excerpt">' + (d.excerpt || "") + '</div>' +
                '</a>';
            });
            resultsEl.innerHTML = html;
            activeIndex = -1;
          });
        });
      });
    }

    function escapeHtml(str) {
      var div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    input.addEventListener("input", function () {
      var q = input.value;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { doSearch(q); }, 200);
    });
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(getSystemTheme());
      }
    });
})();
