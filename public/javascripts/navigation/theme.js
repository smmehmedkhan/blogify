async function setIcon(btn, path) {
  const res = await fetch(path);
  btn.innerHTML = await res.text();
}

function setLogo(logo, path) {
  logo.src = path;
}

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.documentElement;
  const toggleBtns = document.querySelectorAll('.toggle-theme');
  const logos = document.querySelectorAll('.logo');

  const sunIcon = '/icons/sun.svg';
  const moonIcon = '/icons/moon.svg';
  const lightLogo = '/images/blogify-logo-dark.png'; // used in light theme
  const darkLogo = '/images/blogify-logo-light.png'; // used in dark theme

  // Get stored theme or detect system preference
  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // Apply saved/detected theme
  root.setAttribute('data-theme', savedTheme);
  const isDark = savedTheme === 'dark';

  toggleBtns.forEach(async (btn) => {
    await setIcon(btn, isDark ? sunIcon : moonIcon);
  });

  logos.forEach((logo) => {
    setLogo(logo, isDark ? darkLogo : lightLogo);
  });

  // Toggle theme on button click
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      const isNowDark = newTheme === 'dark';
      await setIcon(btn, isNowDark ? sunIcon : moonIcon);

      logos.forEach((logo) => {
        setLogo(logo, isNowDark ? darkLogo : lightLogo);
      });
    });
  });
});
