document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const elements = {
    openBtn: document.getElementById('searchBtn'),
    closeBtn: document.getElementById('searchClose'),
    input: document.getElementById('searchInput'),
    bar: document.querySelector('.searchBar'),
    form: document.getElementById('registerForm'),
  };

  // Validate all elements exist
  if (!Object.values(elements).every((element) => element)) {
    console.error('Required DOM elements not found');
    return;
  }

  // Setup open search functionality
  elements.openBtn.addEventListener('click', () => {
    elements.bar.style.visibility = 'visible';
    elements.bar.classList.add('open');
    elements.openBtn.setAttribute('aria-expanded', 'true');
    elements.input.focus(); // Focus the input instead of the bar
  });

  // Setup close search functionality
  elements.closeBtn.addEventListener('click', () => {
    elements.bar.style.visibility = 'hidden';
    elements.bar.classList.remove('open');
    elements.openBtn.setAttribute('aria-expanded', 'false');
  });
});
