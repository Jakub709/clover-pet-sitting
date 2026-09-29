/* Clover Pet & House Sitting — UI interactions */
(function () {
  'use strict';

  /* ---- Sticky header shadow ---- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  var grid = document.getElementById('gallery-grid');

  /* ---- Lightbox ---- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox && grid) {
    var lbImg = document.getElementById('lb-img');
    var galleryLinks = Array.prototype.slice.call(grid.querySelectorAll('a'));
    var current = 0;

    var show = function (i) {
      current = (i + galleryLinks.length) % galleryLinks.length;
      var link = galleryLinks[current];
      lbImg.src = link.getAttribute('href');
      lbImg.alt = link.querySelector('img').alt;
    };
    var openLb = function (i) {
      show(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.getElementById('lb-close').focus();
    };
    var closeLb = function () {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.src = '';
    };

    galleryLinks.forEach(function (link, i) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openLb(i);
      });
    });
    document.getElementById('lb-close').addEventListener('click', closeLb);
    document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---- Enquiry form → sent to Netlify Forms, thank-you shown in place ---- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnLabel = submitBtn.textContent;
    var errorMsg = document.getElementById('enquiry-error');
    var thanks = document.getElementById('enquiry-thanks');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // Readable subject line for the notification email in Monika's inbox
      var v = function (id) { return (document.getElementById(id).value || '').trim(); };
      var dates = v('f-dates');
      form.elements.subject.value = 'New enquiry: ' + v('f-name') + (dates ? ' — ' + dates : '');

      var data = new FormData(form);
      data.set('form-name', form.getAttribute('name'));

      errorMsg.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      })
        .then(function (res) {
          // Netlify answers non-2xx when the form isn't registered — don't claim success then
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.hidden = true;
          thanks.hidden = false;
          thanks.focus();
        })
        .catch(function () {
          errorMsg.hidden = false;
          submitBtn.disabled = false;
          submitBtn.textContent = btnLabel;
        });
    });
  }
})();
