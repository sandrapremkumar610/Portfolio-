/* Sandra Premkumar — Portfolio: shared behaviour for every page */
(function () {
  "use strict";

  var doc = document;
  doc.documentElement.classList.remove("no-js");

  // Mobile menu
  var btn = doc.querySelector(".menu-btn");
  var links = doc.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header shadow on scroll
  var header = doc.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal
  var items = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Duplicate marquee content for a seamless loop
  doc.querySelectorAll(".marquee-track").forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  // Footer year
  var y = doc.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Contact form: opens the visitor's email app with the message pre-filled
  var form = doc.getElementById("contact-form");
  if (form) {
    var status = doc.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var email = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();
      if (!name || !email || !message) {
        status.textContent = "Please fill in your name, email and message.";
        return;
      }
      var subject = "Portfolio enquiry from " + name;
      var body = message + "\n\n— " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : "");
      window.location.href = "mailto:sandrapremkumar46@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Opening your email app…";
    });
  }
})();
