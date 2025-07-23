// public/javascripts/components/testimonial-slider.js
document.addEventListener('DOMContentLoaded', function () {
  const dots = document.querySelectorAll('.slider__dot');
  const cards = document.querySelectorAll('.testimonial__card');

  // Initialize with first slide active
  showSlide(0);

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  function showSlide(index) {
    // Update dots
    dots.forEach((dot) => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // On mobile, show only the active slide
    if (window.innerWidth <= 1024) {
      cards.forEach((card, i) => {
        if (i === index) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  // Auto-rotate slides every 5 seconds
  let currentSlide = 0;
  setInterval(() => {
    if (window.innerWidth <= 1024) {
      currentSlide = (currentSlide + 1) % dots.length;
      showSlide(currentSlide);
    }
  }, 5000);
});
