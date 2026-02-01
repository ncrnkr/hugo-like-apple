(function () {
  var doc = document;
  doc.documentElement.classList.add('js');

  var navToggle = doc.querySelector('[data-nav-toggle]');
  var navList = doc.querySelector('[data-nav-list]');

  if (navToggle && navList) {
    var closeNav = function () {
      navList.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', function () {
      navList.classList.toggle('is-open');
      navToggle.classList.toggle('is-open');
      var isOpen = navList.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navList.addEventListener('click', function (event) {
      if (event.target && event.target.tagName === 'A') {
        closeNav();
      }
    });

    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeNav();
      }
    });
  }

  var revealEls = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));
  if (!revealEls.length) return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
