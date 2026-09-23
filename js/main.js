/**
 * BEYOND PREDICTIONS - JAVASCRIPT CONTROLLER
 * Dr. Phaniraj Astrologer | Pure Vanilla ES6
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initHeroSlider();
  initLightbox();
  initForms();
  initNakshatraFilter();
  initBackToTop();
  initZodiacTabs();
  initTestimonialCarousel();
});

/* --- 1. STICKY HEADER --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- 2. MOBILE DRAWER NAVIGATION --- */
function initMobileDrawer() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!mobileBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close when clicking internal links
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* --- 3. HERO SLIDER CAROUSEL --- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoplay();
    });
  });

  const sliderSection = document.querySelector('.hero-slider-section');
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', stopAutoplay);
    sliderSection.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

/* --- 4. ACCREDITATION LIGHTBOX MODAL --- */
function initLightbox() {
  const certCards = document.querySelectorAll('[data-lightbox-img]');
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  const modalImg = modal.querySelector('.lightbox-img');
  const modalCaption = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');

  certCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = card.getAttribute('data-lightbox-img');
      const title = card.getAttribute('data-lightbox-title') || '';
      
      if (modalImg) modalImg.src = imgSrc;
      if (modalCaption) modalCaption.textContent = title;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- 5. FORM HANDLING WITH WHATSAPP & EMAIL DISPATCH --- */
function initForms() {
  const forms = document.querySelectorAll('.astrology-form');
  const successModal = document.getElementById('successModal');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const modalEmailBtn = document.getElementById('modalEmailBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="fname"]') || form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="telephone"]') || form.querySelector('[name="phone"]');
      const emailInput = form.querySelector('[name="email"]');
      const dateInput = form.querySelector('[name="date"]');
      const contentInput = form.querySelector('[name="content"]') || form.querySelector('[name="message"]');
      const serviceInput = form.querySelector('[name="service"]');

      const name = nameInput ? nameInput.value.trim() : 'Guest';
      const phone = phoneInput ? phoneInput.value.trim() : 'Not provided';
      const email = emailInput ? emailInput.value.trim() : 'Not provided';
      const date = dateInput ? dateInput.value.trim() : 'Immediate';
      const content = contentInput ? contentInput.value.trim() : 'Consultation inquiry';
      const service = serviceInput ? serviceInput.value.trim() : 'Astrology Consultation';

      if (!name || name === 'Guest') {
        alert('Please enter your name.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || phone === 'Not provided') {
        alert('Please enter your phone number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Format WhatsApp message
      const messageText = `Namaste Dr. Phaniraj, I would like to book a consultation:%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Preferred Date:* ${encodeURIComponent(date)}%0A*Service:* ${encodeURIComponent(service)}%0A*Enquiry Details:* ${encodeURIComponent(content)}`;
      const whatsappUrl = `https://wa.me/918792879390?text=${messageText}`;

      // Format Email Link
      const mailtoSubject = encodeURIComponent(`Consultation Booking Request - ${name}`);
      const mailtoBody = encodeURIComponent(`Namaste Dr. Phaniraj,\n\nI would like to book an astrology consultation.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred Date: ${date}\nService: ${service}\nEnquiry Details:\n${content}\n\nThank you.`);
      const mailtoUrl = `mailto:phn.rek@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      if (modalWhatsappBtn) modalWhatsappBtn.href = whatsappUrl;
      if (modalEmailBtn) modalEmailBtn.href = mailtoUrl;

      if (successModal) {
        successModal.classList.add('active');
      } else {
        // Fallback direct WhatsApp redirect
        window.open(whatsappUrl, '_blank');
      }

      form.reset();
    });
  });

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('active');
    });
  }
}

/* --- 6. NAKSHATRAS SEARCH & FILTER --- */
function initNakshatraFilter() {
  const searchInput = document.getElementById('nakshatraSearch');
  const table = document.getElementById('nakshatrasTable');

  if (!searchInput || !table) return;

  const rows = table.querySelectorAll('tbody tr');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

/* --- 7. BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- 8. ZODIAC QUICK SELECTION TABS --- */
function initZodiacTabs() {
  const pills = document.querySelectorAll('.zodiac-pill');
  if (pills.length === 0) return;

  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const targetId = pill.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');

          const headerOffset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* --- 9. TESTIMONIAL CAROUSEL CYCLING --- */
function initTestimonialCarousel() {
  const carousels = document.querySelectorAll('.testimonial-carousel');
  if (carousels.length === 0) return;

  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.testimonial-dot');
    const prevBtn = carousel.querySelector('.testimonial-btn.prev');
    const nextBtn = carousel.querySelector('.testimonial-btn.next');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let timer = null;

    function show(index) {
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    function next() {
      let nextIdx = (currentIndex + 1) % slides.length;
      show(nextIdx);
    }

    function prev() {
      let prevIdx = (currentIndex - 1 + slides.length) % slides.length;
      show(prevIdx);
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(next, 5000);
    }

    function stopTimer() {
      if (timer) clearInterval(timer);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        next();
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prev();
        startTimer();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        show(idx);
        startTimer();
      });
    });

    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    startTimer();
  });
}
