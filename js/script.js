/* =========================================================
   Jennings Cleaning — homepage interactions
   Vanilla JS · no dependencies
   ========================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header shadow ---------- */
  var navbar = document.querySelector(".navbar");
  function onScroll() {
    if (navbar) navbar.classList.toggle("is-stuck", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("primaryNav");
  var toggle = document.getElementById("navToggle");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (header) header.classList.remove("nav-open");
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add("is-open");
    if (header) header.classList.add("nav-open");
    document.body.classList.add("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav();
      else openNav();
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) closeNav();
    });
  }

  /* ---------- FAQ accordion ---------- */
  var accordion = document.getElementById("faqAccordion");
  if (accordion) {
    var items = Array.prototype.slice.call(accordion.querySelectorAll(".accordion__item"));

    function setPanel(item, open) {
      var panel = item.querySelector(".accordion__panel");
      var trigger = item.querySelector(".accordion__trigger");
      if (open) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      }
    }

    items.forEach(function (item) {
      var trigger = item.querySelector(".accordion__trigger");
      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (other) { setPanel(other, false); });
        if (!isOpen) setPanel(item, true);
      });
    });

    // Open the first question by default for a lived-in feel.
    if (items.length) setPanel(items[0], true);
  }

  /* ---------- Testimonial slider ---------- */
  var track = document.getElementById("testimonialTrack");
  var dotsWrap = document.getElementById("quoteDots");
  var prevBtn = document.getElementById("quotePrev");
  var nextBtn = document.getElementById("quoteNext");

  if (track && dotsWrap) {
    var slides = Array.prototype.slice.call(track.children);
    var current = 0;
    var timer = null;
    var dots = [];

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1) + " of " + slides.length);
      dot.addEventListener("click", function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function render() {
      track.style.transform = "translateX(-" + current * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
        dot.setAttribute("aria-selected", i === current ? "true" : "false");
      });
    }

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      render();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function start() {
      if (reduceMotion || slides.length < 2) return;
      timer = window.setInterval(next, 6500);
    }
    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }
    function restart() { stop(); start(); }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    var slider = document.getElementById("testimonialSlider");
    if (slider) {
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
      slider.addEventListener("focusin", stop);
      slider.addEventListener("focusout", start);
    }

    // Basic touch swipe support.
    var startX = null;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
      startX = null;
      start();
    }, { passive: true });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    render();
    start();
  }

  /* ---------- Reveal on scroll ---------- */
  var revealSelectors = [
    ".section__head",
    ".stat",
    ".about__content",
    ".about__media",
    ".service-row",
    ".extra-services",
    ".why-card",
    ".process__item",
    ".plan",
    ".areas__intro",
    ".areas__list",
    ".faq__intro",
    ".accordion",
    ".cta__inner"
  ];

  var revealEls = [];
  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { revealEls.push(el); });
  });

  if ("IntersectionObserver" in window && !reduceMotion && revealEls.length) {
    // Gentle stagger for siblings.
    var groups = new Map();
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      var key = el.parentElement;
      var idx = groups.get(key) || 0;
      groups.set(key, idx + 1);
      el.style.transitionDelay = Math.min(idx * 80, 400) + "ms";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
