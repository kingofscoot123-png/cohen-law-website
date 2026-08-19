(function () {
  document.documentElement.classList.add("js");

  const root = document.body.dataset.root || "./";
  const page = document.body.dataset.page || "";
  const lang = document.documentElement.lang || "he";
  const isEn = lang === "en";

  const routes = isEn
    ? {
        home: `${root}index.html`,
        realEstate: `${root}real-estate.html`,
        contact: `${root}contact.html`,
        heHome: `${root}../index.html`,
      }
    : {
        home: `${root}index.html`,
        about: `${root}about.html`,
        family: `${root}services/family.html`,
        labor: `${root}services/labor.html`,
        realEstate: `${root}services/real-estate.html`,
        testimonials: `${root}testimonials.html`,
        blog: `${root}blog/index.html`,
        faq: `${root}faq.html`,
        team: `${root}team.html`,
        contact: `${root}contact.html`,
        accessibility: `${root}accessibility.html`,
        enHome: `${root}en/index.html`,
      };

  const icons = {
    phone: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3c0 1-1 2-2 2C9 19.5 4.5 15 4.5 5.5c0-1 1-2 2-2Z"/></svg>`,
    chevron: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 4l4 4 4-4"/></svg>`,
    wa: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.5 2 2 6.37 2 11.74c0 1.72.46 3.4 1.33 4.88L2 22l5.55-1.45a10.3 10.3 0 0 0 4.49 1.02h.01c5.54 0 10.04-4.37 10.04-9.74C22.09 6.37 17.58 2 12.04 2Zm5.83 13.78c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.89-1.25-4.77-4.15-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.2-.14.31-.28.48-.14.17-.3.38-.42.51-.14.14-.28.29-.12.56.16.28.7 1.16 1.51 1.88 1.04.92 1.91 1.21 2.18 1.35.27.14.43.12.59-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.61-.13.25.08 1.58.74 1.85.88.27.13.45.2.52.31.06.12.06.68-.18 1.36Z"/></svg>`,
  };

  const navItemsHe = [
    { type: "link", label: "בית", href: routes.home, page: "home" },
    { type: "link", label: "אודות", href: routes.about, page: "about" },
    {
      type: "dropdown",
      label: "תחומי התמחות",
      children: [
        { label: "דיני משפחה", href: routes.family, page: "family" },
        { label: "דיני עבודה", href: routes.labor, page: "labor" },
        { label: "נדל״ן", href: routes.realEstate, page: "real-estate" },
      ],
    },
    { type: "link", label: "המלצות", href: routes.testimonials, page: "testimonials" },
    { type: "link", label: "בלוג", href: routes.blog, page: "blog" },
    { type: "link", label: "שאלות נפוצות", href: routes.faq, page: "faq" },
    { type: "link", label: "צוות", href: routes.team, page: "team" },
    { type: "link", label: "צור קשר", href: routes.contact, page: "contact" },
  ];

  const navItemsEn = [
    { type: "link", label: "Home", href: routes.home, page: "home" },
    { type: "link", label: "Real Estate", href: routes.realEstate, page: "real-estate" },
    { type: "link", label: "Contact", href: routes.contact, page: "contact" },
  ];

  function navLinkClass(itemPage) {
    return page === itemPage ? "is-active" : "";
  }

  const logoFull = `${root}assets/images/logo-cohen.png`;

  function renderLogo(variant) {
    const isFooter = variant === "footer";
    const alt = isEn ? "Cohen & Co., Attorneys" : "כהן ושות׳, עורכי דין";
    const src = logoFull;
    const cls = isFooter ? "logo-img logo-img--footer" : "logo-img logo-img--header";
    return `<img class="${cls}" src="${src}" alt="${alt}" width="${isFooter ? 300 : 200}" height="${isFooter ? 150 : 88}" decoding="async">`;
  }

  function renderDesktopNav(items) {
    return items
      .map((item) => {
        if (item.type === "link") {
          return `<a href="${item.href}" class="${navLinkClass(item.page)}">${item.label}</a>`;
        }
        const childLinks = item.children
          .map((child) => `<a href="${child.href}" class="${navLinkClass(child.page)}">${child.label}</a>`)
          .join("");
        return `
          <div class="nav-drop">
            <button type="button" aria-expanded="false">${item.label} ${icons.chevron}</button>
            <div class="nav-drop-menu">${childLinks}</div>
          </div>`;
      })
      .join("");
  }

  function renderMobileNav(items) {
    return items
      .map((item) => {
        if (item.type === "link") {
          return `<a href="${item.href}" class="mobile-nav__link ${navLinkClass(item.page)}">${item.label}</a>`;
        }
        const childLinks = item.children
          .map(
            (child) =>
              `<a href="${child.href}" class="mobile-nav__link mobile-nav__link--sub ${navLinkClass(child.page)}">${child.label}</a>`
          )
          .join("");
        return `
          <div class="mobile-nav__group">
            <span class="mobile-nav__label">${item.label}</span>
            ${childLinks}
          </div>`;
      })
      .join("");
  }

  function headerHe() {
    return `
      <a class="skip-link" href="#main">דלג לתוכן</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="logo" href="${routes.home}" aria-label="כהן ושות׳, עורכי דין">
            ${renderLogo("header")}
          </a>
          <nav class="nav nav--desktop" id="site-nav-desktop" aria-label="ניווט ראשי">
            ${renderDesktopNav(navItemsHe)}
          </nav>
          <div class="header-actions">
            <a class="lang-switch" href="${routes.enHome}" lang="en" hreflang="en">EN</a>
            <a class="header-phone" href="tel:035614488">${icons.phone}<span>03-561-4488</span></a>
            <a class="btn btn-primary magnetic" href="${routes.contact}">דברו איתנו</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="פתח תפריט"><span></span></button>
          </div>
        </div>
      </header>
      <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
        <nav class="mobile-nav__inner" id="site-nav" aria-label="ניווט ראשי">
          ${renderMobileNav(navItemsHe)}
          <div class="mobile-nav__cta">
            <a class="lang-switch" href="${routes.enHome}" lang="en" hreflang="en">EN</a>
            <a class="btn btn-primary" href="${routes.contact}">דברו איתנו</a>
          </div>
        </nav>
      </div>`;
  }

  function headerEn() {
    return `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="logo" href="${routes.home}" aria-label="Cohen & Co., Attorneys">
            ${renderLogo("header")}
          </a>
          <nav class="nav nav--desktop" id="site-nav-desktop" aria-label="Primary">
            ${renderDesktopNav(navItemsEn)}
          </nav>
          <div class="header-actions">
            <a class="lang-switch" href="${routes.heHome}" lang="he" hreflang="he">עב</a>
            <a class="header-phone" href="tel:+97235614488">${icons.phone}<span>03-561-4488</span></a>
            <a class="btn btn-primary" href="${routes.contact}">Book a consultation</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span></span></button>
          </div>
        </div>
      </header>
      <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
        <nav class="mobile-nav__inner" id="site-nav" aria-label="Primary">
          ${renderMobileNav(navItemsEn)}
          <div class="mobile-nav__cta">
            <a class="lang-switch" href="${routes.heHome}" lang="he" hreflang="he">עב</a>
            <a class="btn btn-primary" href="${routes.contact}">Book a consultation</a>
          </div>
        </nav>
      </div>`;
  }

  function footerHe() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-logo">
              <a class="logo logo--footer" href="${routes.home}">
                ${renderLogo("footer")}
              </a>
              <p style="margin-top:16px;max-width:28ch">ייצוג משפטי במשפחה, עבודה ונדל״ן, בשפה ברורה ועם יחס אישי.</p>
            </div>
            <div>
              <h3>קישורים</h3>
              <a href="${routes.about}">אודות המשרד</a>
              <a href="${routes.team}">הצוות</a>
              <a href="${routes.blog}">מאמרים</a>
              <a href="${routes.faq}">שאלות נפוצות</a>
              <a href="${routes.testimonials}">המלצות</a>
            </div>
            <div>
              <h3>תחומי התמחות</h3>
              <a href="${routes.family}">דיני משפחה</a>
              <a href="${routes.labor}">דיני עבודה</a>
              <a href="${routes.realEstate}">נדל״ן</a>
              <a href="${routes.contact}">קביעת פגישה</a>
            </div>
            <div>
              <h3>צור קשר</h3>
              <a href="tel:035614488" style="direction:ltr">03-561-4488</a>
              <a href="https://wa.me/972525554488" target="_blank" rel="noopener">וואטסאפ</a>
              <a href="mailto:office@cohen-law.co.il">office@cohen-law.co.il</a>
              <p style="margin-top:8px">ויצמן 14, תל אביב<br>א׳ עד ה׳ 09:00–18:00<br>ו׳ 09:00–13:00</p>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} כהן ושות׳, עורכי דין. כל הזכויות שמורות.</span>
            <a href="${routes.accessibility}">הצהרת נגישות</a>
          </div>
        </div>
      </footer>
      <a class="whatsapp-float" href="https://wa.me/972525554488" target="_blank" rel="noopener" aria-label="פנו בוואטסאפ">${icons.wa}</a>`;
  }

  function footerEn() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-logo">
              <a class="logo logo--footer" href="${routes.home}">
                ${renderLogo("footer")}
              </a>
              <p style="margin-top:16px;max-width:32ch">Legal representation in family, employment and real estate, in clear language, with personal attention.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <a href="${routes.home}">Home</a>
              <a href="${routes.realEstate}">Real estate</a>
              <a href="${routes.contact}">Contact</a>
            </div>
            <div>
              <h3>Hebrew site</h3>
              <a href="${routes.heHome}" lang="he">לאתר בעברית</a>
            </div>
            <div>
              <h3>Contact</h3>
              <a href="tel:+97235614488" style="direction:ltr">+972-3-561-4488</a>
              <a href="mailto:office@cohen-law.co.il">office@cohen-law.co.il</a>
              <p style="margin-top:8px">14 Weizmann St., Tel Aviv<br>Sun to Thu 09:00–18:00</p>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Cohen & Co., Attorneys. All rights reserved.</span>
            <a href="${root}../accessibility.html" lang="he">Accessibility</a>
          </div>
        </div>
      </footer>`;
  }

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = isEn ? headerEn() : headerHe();
  if (footerMount) footerMount.innerHTML = isEn ? footerEn() : footerHe();

  const mobileNav = document.getElementById("mobile-nav");
  const toggle = document.querySelector(".menu-toggle");
  const setMenu = (open) => {
    if (!mobileNav || !toggle) return;
    mobileNav.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    document.body.classList.toggle("is-menu-open", open);
    mobileNav.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? (isEn ? "Close menu" : "סגור תפריט") : (isEn ? "Open menu" : "פתח תפריט"));
  };
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => setMenu(!mobileNav.classList.contains("is-open")));
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.querySelectorAll("[data-category]").forEach((card) => {
        card.style.display = filter === "all" || card.dataset.category === filter ? "" : "none";
      });
    });
  });

  function initQuotesCarousel() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("[data-carousel]").forEach((root) => {
      const track = root.querySelector(".quotes-carousel__track");
      const slides = Array.from(root.querySelectorAll(".quotes-carousel__slide"));
      const prevBtn = root.querySelector(".quotes-carousel__btn--prev");
      const nextBtn = root.querySelector(".quotes-carousel__btn--next");
      const dotsWrap = root.querySelector(".quotes-carousel__dots");
      if (!track || slides.length < 2 || !dotsWrap) return;

      let index = 0;
      let timer = null;

      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = `quotes-carousel__dot${i === 0 ? " is-active" : ""}`;
        dot.setAttribute("aria-label", `המלצה ${i + 1}`);
        dot.addEventListener("click", () => {
          goTo(i);
          resetTimer();
        });
        dotsWrap.appendChild(dot);
      });
      const dots = Array.from(dotsWrap.querySelectorAll(".quotes-carousel__dot"));

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((slide, idx) => slide.classList.toggle("is-active", idx === index));
        dots.forEach((dot, idx) => dot.classList.toggle("is-active", idx === index));
      }

      function next() {
        goTo(index + 1);
      }

      function prev() {
        goTo(index - 1);
      }

      function resetTimer() {
        clearInterval(timer);
        if (!reduce) timer = setInterval(next, 6000);
      }

      prevBtn?.addEventListener("click", () => {
        prev();
        resetTimer();
      });
      nextBtn?.addEventListener("click", () => {
        next();
        resetTimer();
      });

      root.addEventListener("mouseenter", () => clearInterval(timer));
      root.addEventListener("mouseleave", resetTimer);

      let startX = 0;
      track.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );
      track.addEventListener(
        "touchend",
        (e) => {
          const dx = e.changedTouches[0].clientX - startX;
          if (Math.abs(dx) < 40) return;
          if (dx > 0) prev();
          else next();
          resetTimer();
        },
        { passive: true }
      );

      goTo(0);
      resetTimer();
    });
  }

  initQuotesCarousel();

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach((field) => {
        const wrap = field.closest(".field");
        const value = field.value.trim();
        const phoneOk = field.type !== "tel" || /[\d\-+()\s]{7,}/.test(value);
        const emailOk = field.type !== "email" || /.+@.+\..+/.test(value);
        const valid = value.length > 0 && phoneOk && emailOk;
        wrap.classList.toggle("has-error", !valid);
        if (!valid) ok = false;
      });
      if (ok) {
        form.reset();
        const success = form.querySelector(".form-success");
        if (success) success.classList.add("is-visible");
      }
    });
  });

  const motion = document.createElement("script");
  motion.src = `${root}js/motion.js`;
  document.body.appendChild(motion);

  const revealEls = document.querySelectorAll(".reveal-on-scroll, .reveal-title");
  const show = (el) => el.classList.add("is-inview");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach(show);
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    window.setTimeout(() => revealEls.forEach(show), 2400);
  } else {
    revealEls.forEach(show);
  }
})();
