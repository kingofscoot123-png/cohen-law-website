(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function revealAll(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.classList.add("is-inview");
    });
  }

  function initLenis() {
    if (reduce || !window.Lenis) return null;
    const lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    document.documentElement.classList.add("lenis");
    return lenis;
  }

  function initMagnetic() {
    if (reduce || !finePointer) return;
    document.querySelectorAll(".magnetic, .hero .btn").forEach((el) => {
      const strength = 0.18;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  function initPortraitParallax() {
    if (reduce || !finePointer) return;
    const frame = document.querySelector(".hero-portrait__frame");
    const img = document.querySelector(".hero-portrait img");
    if (!frame || !img) return;

    frame.addEventListener("mousemove", (e) => {
      const r = frame.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 6;
      img.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    frame.addEventListener("mouseleave", () => {
    img.style.transform = "translate(0, 0)";
    });
  }

  function initHeroStagger(gsap) {
    const items = document.querySelectorAll(".hero-copy > *");
    if (!items.length) return;
    if (reduce) {
      revealAll(".hero-copy > *");
      return;
    }
    gsap.fromTo(
      items,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out", delay: 0.08 }
    );
  }

  function initScrollReveals(gsap, ScrollTrigger) {
    const els = gsap.utils.toArray(".reveal-title, .reveal-on-scroll");
    if (!els.length) return;
    if (reduce) {
      revealAll(".reveal-title, .reveal-on-scroll");
      return;
    }

    els.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
  }

  function initPillars(gsap, ScrollTrigger) {
    const section = document.querySelector(".pillars");
    if (!section) return;

    const pillars = gsap.utils.toArray(".pillar");
    const nums = gsap.utils.toArray(".pillar__num");
    const labels = gsap.utils.toArray(".pillar__label");
    const center = section.querySelector(".pillars__center");
    if (!pillars.length) return;

    if (reduce) {
      revealAll(".pillar, .pillar__num, .pillar__label");
      return;
    }

    const ease = "power3.out";
    const dirs = [
      { x: 0, y: -40 },
      { x: 48, y: 0 },
      { x: -48, y: 0 },
      { x: 32, y: 48 },
      { x: -32, y: 48 },
    ];

    const tl = gsap.timeline({
      defaults: { ease },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (!tl.scrollTrigger) {
      revealAll(".pillar, .pillar__num, .pillar__label");
      return;
    }

    gsap.set(pillars, { opacity: 0 });
    gsap.set(nums, { opacity: 0 });
    gsap.set(labels, { opacity: 0 });

    tl.fromTo(center, { scale: 1 }, { scale: 1.02, duration: 0.5, ease: "none" }, 0);
    tl.to(center, { scale: 1, duration: 0.5, ease: "none" }, 0.5);

    pillars.forEach((pillar, i) => {
      const start = 0.05 + i * 0.15;
      const d = dirs[i];
      tl.to(pillar, { opacity: 1, duration: 0.15 }, start);
      tl.fromTo(
        nums[i],
        { x: d.x, y: d.y, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.15 },
        start
      );
      tl.fromTo(
        labels[i],
        { y: d.y * 0.35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.13 },
        start + 0.025
      );
    });

    tl.to(nums[0], { y: 18, duration: 0.2, ease: "none" }, 0.8);
    tl.to(nums[1], { y: -16, duration: 0.2, ease: "none" }, 0.8);
    tl.to(nums[2], { y: 14, duration: 0.2, ease: "none" }, 0.8);
    tl.to(nums[3], { y: -12, duration: 0.2, ease: "none" }, 0.8);
    tl.to(nums[4], { y: 20, duration: 0.2, ease: "none" }, 0.8);
  }

  function boot() {
    initMagnetic();
    initPortraitParallax();

    Promise.all([
      loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"),
      loadScript("https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"),
    ])
      .then(() => loadScript("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"))
      .then(() => {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        if (!gsap || !ScrollTrigger) {
          revealAll(".pillar, .pillar__num, .pillar__label, .reveal-on-scroll, .reveal-title");
          return;
        }

        gsap.registerPlugin(ScrollTrigger);
        const lenis = initLenis();
        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
          const menuWatch = new MutationObserver(() => {
            if (document.body.classList.contains("is-menu-open")) lenis.stop();
            else lenis.start();
          });
          menuWatch.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        }

        initHeroStagger(gsap);
        initScrollReveals(gsap, ScrollTrigger);
        initPillars(gsap, ScrollTrigger);
        ScrollTrigger.refresh();
      })
      .catch(() => {
        revealAll(".pillar, .pillar__num, .pillar__label, .reveal-on-scroll, .reveal-title");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
