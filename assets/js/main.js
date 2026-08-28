// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menü öffnen');
    });
  });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Gallery carousel
const galleryTrack = document.getElementById('gallery-track');
const carouselPrev = document.querySelector('.carousel-btn-prev');
const carouselNext = document.querySelector('.carousel-btn-next');

if (galleryTrack) {
  const scrollByAmount = () => {
    const item = galleryTrack.querySelector('.carousel-item');
    return item ? item.getBoundingClientRect().width + 20 : galleryTrack.clientWidth * 0.8;
  };

  carouselPrev?.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });

  carouselNext?.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });

  // Allow vertical mouse-wheel scrolling to move the carousel horizontally
  galleryTrack.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      galleryTrack.scrollBy({ left: event.deltaY });
    },
    { passive: false }
  );
}
