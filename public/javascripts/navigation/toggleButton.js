document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbarMenu = document.getElementById('navbarMenu');

  hamburger.addEventListener('click', () => {
    if (navbarMenu.classList.contains('show')) {
      navbarMenu.classList.remove('show');
      navbarMenu.classList.add('hide');
      document.body.style.overflow = '';
    } else {
      navbarMenu.classList.remove('hide');
      navbarMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    hamburger.classList.toggle('active');
  });
});
