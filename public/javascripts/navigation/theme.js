async function setIcon(btn, path) {
  const res = await fetch(path);
  btn.innerHTML = await res.text();
}

function setLogo(logo, path) {
  logo.src = path;
}

document.addEventListener('DOMContentLoaded', async () => {
  const body = document.body;
  const toggleBtns = document.querySelectorAll('.toggle-theme');
  const logos = document.querySelectorAll('.logo');
  const sunIcon = '/icons/sun.svg';
  const moonIcon = '/icons/moon.svg';
  const whiteLogo = '/images/blogify-logo-light.png';
  const blackLogo = '/images/blogify-logo-dark.png';

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    toggleBtns.forEach(async (btn) => {
      await setIcon(btn, sunIcon);
    });

    logos.forEach((logo) => {
      setLogo(logo, whiteLogo);
    });
  } else {
    toggleBtns.forEach(async (btn) => {
      await setIcon(btn, moonIcon);
    });

    logos.forEach((logo) => {
      setLogo(logo, blackLogo);
    });
  }

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      await setIcon(btn, isDark ? sunIcon : moonIcon);

      logos.forEach((logo) => {
        setLogo(logo, isDark ? whiteLogo : blackLogo);
      });

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });
});
