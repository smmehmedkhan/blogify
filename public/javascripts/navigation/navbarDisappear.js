document.addEventListener('DOMContentLoaded', () => {
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      navbar.classList.add('disappear');
    } else {
      // Scrolling up
      navbar.classList.remove('disappear');
    }

    lastScrollY = currentScrollY;
  });
});
