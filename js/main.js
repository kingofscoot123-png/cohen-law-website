(function () {
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

  function headerHe() {
    return `
      <a class="skip-link" href="#main">${isEn ? "Skip to content" : "דלג לתוכן"}</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="logo" href="${routes.home}" aria-label="כהן ושות׳, עורכי דין">
            <span class="logo-mark">כ</span>
            <span class="logo-text">
              <strong>כהן ושות׳</strong>
              <small>עורכי דין</small>
            </span>
          </a>
          <nav class="nav" id="site-nav" aria-label="ניווט ראשי">
            <a href="${routes.home}" class="${page === "home" ? "is-active" : ""}">בית</a>
            <a href="${routes.about}" class="${page === "about" ? "is-active" : ""}">אודות</a>
            <div class="nav-drop">
              <button type="button" aria-expanded="false">תחומי התמחות ${icons.chevron}</button>
              <div class="nav-drop-menu">
                <a href="${routes.family}" class="${page === "family" ? "is-active" : ""}">דיני משפחה</a>
                <a href="${routes.labor}" class="${page === "labor" ? "is-active" : ""}">דיני עבודה</a>
                <a href="${routes.realEstate}" class="${page === "real-estate" ? "is-active" : ""}">נדל״ן</a>
              </div>
            </div>
            <a href="${routes.testimonials}" class="${page === "testimonials" ? "is-active" : ""}">המלצות</a>
            <a href="${routes.blog}" class="${page === "blog" ? "is-active" : ""}">בלוג</a>
            <a href="${routes.faq}" class="${page === "faq" ? "is-active" : ""}">שאלות נפוצות</a>
            <a href="${routes.team}" class="${page === "team" ? "is-active" : ""}">צוות</a>
            <a href="${routes.contact}" class="${page === "contact" ? "is-active" : ""}">צור קשר</a>
          </nav>
          <div class="header-actions">
            <a class="lang-switch" href="${routes.enHome}" lang="en" hreflang="en">EN</a>
            <a class="header-phone" href="tel:035614488">${icons.phone}<span>03-561-4488</span></a>
            <a class="btn btn-primary" href="${routes.contact}">דברו איתנו</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="פתח תפריט"><span></span></button>
          </div>
        </div>
      </header>`;
  }

  function headerEn() {
    return `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="logo" href="${routes.home}" aria-label="Cohen & Co., Attorneys">
            <span class="logo-mark">C</span>
            <span class="logo-text">
              <strong>Cohen & Co.</strong>
              <small>Attorneys</small>
            </span>
          </a>
          <nav class="nav" id="site-nav" aria-label="Primary">
            <a href="${routes.home}" class="${page === "home" ? "is-active" : ""}">Home</a>
            <a href="${routes.realEstate}" class="${page === "real-estate" ? "is-active" : ""}">Real Estate</a>
            <a href="${routes.contact}" class="${page === "contact" ? "is-active" : ""}">Contact</a>
          </nav>
          <div class="header-actions">
            <a class="lang-switch" href="${routes.heHome}" lang="he" hreflang="he">עב</a>
            <a class="header-phone" href="tel:+97235614488">${icons.phone}<span>03-561-4488</span></a>
            <a class="btn btn-primary" href="${routes.contact}">Book a consultation</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span></button>
          </div>
        </div>
      </header>`;
  }

  function footerHe() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-logo">
              <a class="logo" href="${routes.home}">
                <span class="logo-mark">כ</span>
                <span class="logo-text">
                  <strong>כהן ושות׳</strong>
                  <small>עורכי דין</small>
                </span>
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
              <p style="margin-top:8px">ויצמן 14, תל אביב<br>א׳–ה׳ 09:00–18:00<br>ו׳ 09:00–13:00</p>
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
              <a class="logo" href="${routes.home}">
                <span class="logo-mark">C</span>
                <span class="logo-text">
                  <strong>Cohen & Co.</strong>
                  <small>Attorneys</small>
                </span>
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
              <p style="margin-top:8px">14 Weizmann St., Tel Aviv<br>Sun–Thu 09:00–18:00</p>
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

  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".menu-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
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

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach((field) => {
        const wrap = field.closest(".field");
        const valid = field.value.trim().length > 0 && (field.type !== "email" || /.+@.+\..+/.test(field.value));
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
})();
