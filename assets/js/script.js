/* ==========================================================================
   Portfolio behaviour (vanilla JavaScript, no libraries)
   1. Fill in shared details from data.js
   2. Dark / light theme
   3. Mobile menu
   4. Header border + active navigation link
   5. Reveal sections on scroll
   6. Contact form (Formspree)
   ========================================================================== */

(function () {
  "use strict";

  var data = window.portfolioData || (typeof portfolioData !== "undefined" ? portfolioData : {});
  var root = document.documentElement;
  var base = document.body.getAttribute("data-base") || ""; // "../" on case study pages

  /* 1. SHARED DETAILS ---------------------------------------------------- */

  function localPath(path) {
    return /^(https?:)?\/\//.test(path) ? path : base + path;
  }

  var links = {
    linkedin: data.linkedin,
    github: data.github,
    email: data.email ? "mailto:" + data.email : "",
    resume: data.resume ? localPath(data.resume) : ""
  };
  var texts = {
    name: data.name,
    email: data.email,
    location: data.location,
    resumeText: data.resumeButtonText,
    linkedinText: (data.linkedin || "").replace(/^https?:\/\/(www\.)?/, ""),
    githubText: (data.github || "").replace(/^https?:\/\/(www\.)?/, "")
  };

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var value = links[el.getAttribute("data-link")];
    if (value) { el.setAttribute("href", value); } else { el.hidden = true; }
  });
  document.querySelectorAll("[data-text]").forEach(function (el) {
    var value = texts[el.getAttribute("data-text")];
    if (value) { el.textContent = value; }
  });
  document.querySelectorAll("[data-hide-if-empty]").forEach(function (el) {
    if (!data[el.getAttribute("data-hide-if-empty")]) { el.hidden = true; }
  });

  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  /* 2. THEME ------------------------------------------------------------- */

  var themeButton = document.querySelector(".theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeMeta) { themeMeta.setAttribute("content", theme === "dark" ? "#0e1513" : "#f8faf9"); }
    if (themeButton) {
      themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }
  applyTheme(root.getAttribute("data-theme") || "dark");

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* 3. MOBILE MENU ------------------------------------------------------- */

  var menuButton = document.querySelector(".menu-toggle");
  var menu = document.getElementById("nav-menu");

  function setMenu(open) {
    if (!menuButton || !menu) { return; }
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setMenu(false); }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuButton.focus();
      }
    });
  }

  /* 4. HEADER BORDER + ACTIVE LINK -------------------------------------- */

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (navLinks.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) { spy.observe(section); }
    });
  }

  /* 5. REVEAL ON SCROLL -------------------------------------------------- */

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { revealer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* 6. CONTACT FORM ------------------------------------------------------ */

  var form = document.getElementById("contact-form");
  if (!form) { return; }

  if (data.formspreeEndpoint) { form.setAttribute("action", data.formspreeEndpoint); }
  form.setAttribute("novalidate", ""); // we show our own messages instead of browser pop-ups

  var status = document.getElementById("form-status");
  var submit = form.querySelector('button[type="submit"]');
  var submitLabel = submit.textContent;
  var messages = {
    name: "Enter your name.",
    email: "Enter an email address like name@example.com.",
    subject: "Enter a subject.",
    message: "Enter a message."
  };

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function checkField(field) {
    var error = document.getElementById(field.id + "-error");
    var valid = field.value.trim() !== "" && field.checkValidity();
    field.setAttribute("aria-invalid", String(!valid));
    if (error) {
      error.textContent = valid ? "" : messages[field.name] || "Check this field.";
      error.hidden = valid;
    }
    return valid;
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll("[required]"));
  fields.forEach(function (field) {
    field.addEventListener("blur", function () { if (field.value !== "") { checkField(field); } });
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") { checkField(field); }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!checkField(field) && !firstInvalid) { firstInvalid = field; }
    });
    if (firstInvalid) {
      setStatus("Some fields need attention.", "error");
      firstInvalid.focus();
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    setStatus("", "");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) { throw new Error("Formspree returned " + response.status); }
        form.reset();
        fields.forEach(function (field) { field.removeAttribute("aria-invalid"); });
        setStatus("Message sent. Thank you, I'll reply by email.", "success");
      })
      .catch(function () {
        setStatus(
          "The message could not be sent. Check your connection and try again" +
          (data.email ? ", or email " + data.email + " directly." : "."),
          "error"
        );
      })
      .then(function () {
        submit.disabled = false;
        submit.textContent = submitLabel;
      });
  });
})();
