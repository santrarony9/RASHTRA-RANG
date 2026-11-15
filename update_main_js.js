const fs = require('fs');

const jsContent = `/**
 * Rashtra Rang Modern - Master JavaScript Engine
 * Professional Editorial Motion, AdSense Helper & Interaction System.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Reading Progress Bar (Fixed Viewport Indicator on Articles)
  var progressBar = document.getElementById('reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        var scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      }
    }, { passive: true });
  }

  // 2. Mobile Navigation Drawer (Offcanvas Slide-in)
  var overlay = document.getElementById('offcanvas-overlay');
  var drawer = document.getElementById('offcanvas-drawer');

  window.openMobileDrawer = function () {
    if (overlay) overlay.classList.add('is-active');
    if (drawer) drawer.classList.add('is-active');
  };

  window.closeMobileDrawer = function () {
    if (overlay) overlay.classList.remove('is-active');
    if (drawer) drawer.classList.remove('is-active');
  };

  window.toggleMobileDrawer = function () {
    if (drawer && drawer.classList.contains('is-active')) {
      window.closeMobileDrawer();
    } else {
      window.openMobileDrawer();
    }
  };

  // 3. Search Modal Trigger & Close
  var searchModal = document.getElementById('search-modal');
  var searchInput = document.getElementById('search-input');

  window.openSearchModal = function () {
    if (searchModal) {
      searchModal.style.display = 'flex';
      if (searchInput) {
        setTimeout(function () { searchInput.focus(); }, 120);
      }
    }
  };

  window.closeSearchModal = function () {
    if (searchModal) searchModal.style.display = 'none';
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeMobileDrawer();
      window.closeSearchModal();
    }
  });

  // 4. Interactive Copy Link Button with Live Visual Feedback
  var copyButtons = document.querySelectorAll('.share-btn.copy, .btn-share.copylink');
  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var currentUrl = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl).then(function () {
          var originalText = btn.innerHTML;
          btn.innerHTML = '✓ लिंक कॉपी हो गया!';
          btn.style.backgroundColor = '#15803D';
          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
          }, 2400);
        });
      }
    });
  });

  // 5. Blocksy-style Color Mode (Dark Mode) Engine
  window.toggleDarkMode = function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.setAttribute('data-color-mode', nextTheme);
    localStorage.setItem('rashtrarang_theme', nextTheme);
  };

  // 6. Professional Motion: IntersectionObserver Viewport Reveal
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    var revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: Immediately show all elements if IntersectionObserver is unsupported or reduced motion requested
    var fallbackElements = document.querySelectorAll('.reveal-on-scroll');
    fallbackElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // 7. Popular News Interactive Filter Tabs
  var popularPills = document.querySelectorAll('.popular-pill-btn');
  popularPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      popularPills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      var container = document.querySelector('.popular-cards-grid-4');
      if (container) {
        container.classList.remove('tab-content-fade');
        void container.offsetWidth; // trigger reflow
        container.classList.add('tab-content-fade');
      }
    });
  });

  // 8. Upcoming News Set Reminder Interactive Action
  window.setUpcomingReminder = function (eventTitle, eventDate) {
    var msg = 'राष्ट्र रंग आगामी कवरेज: "' + eventTitle + '"\\nप्रसारण तिथि: ' + eventDate + '\\n\\nआपके कैलेंडर / नोटिफिकेशन में रिमाइंडर जोड़ दिया गया है!';
    alert(msg);
  };

  // 9. Native Lazy Loading Fallback
  if ('loading' in HTMLImageElement.prototype) {
    var images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
});
`;

fs.writeFileSync('rashtrarang-theme/assets/js/main.js', jsContent, 'utf8');
console.log('Successfully updated rashtrarang-theme/assets/js/main.js');
