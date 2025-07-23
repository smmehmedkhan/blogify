document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat__number');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));

        animateCounter(target, 0, countTo, 2000);
        observer.unobserve(target);
      }
    });
  }, options);

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });

  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      element.textContent = currentCount.toLocaleString();

      if (currentCount >= 1000) {
        const formattedCount = (currentCount / 1000)
          .toFixed(1)
          .replace(/\.0$/, '');
        element.textContent = formattedCount + 'k+';
      } else {
        element.textContent = currentCount;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
});
