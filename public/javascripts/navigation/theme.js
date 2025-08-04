class ThemeManager {
  constructor() {
    this.root = document.documentElement;
    this.themeToggleButtons = document.querySelectorAll('.toggle-theme');
    this.mainLogos = document.querySelectorAll('.logo');
    this.partnerLogos = document.querySelectorAll('.brand__logo[data-partner]');

    this.icons = {
      sun: '/icons/sun.svg',
      moon: '/icons/moon.svg',
    };

    this.logos = {
      light: '/images/blogify-logo-dark.png', // for light theme
      dark: '/images/blogify-logo-light.png', // for dark theme
    };

    this.theme = this.getInitialTheme();
    this.applyTheme(this.theme);
    this.addEventListeners();
  }

  getInitialTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  async setButtonIcon(button, theme) {
    const iconPath = theme === 'dark' ? this.icons.sun : this.icons.moon;
    const response = await fetch(iconPath);
    button.innerHTML = await response.text();
  }

  setMainLogos(theme) {
    const logoPath = this.logos[theme];
    this.mainLogos.forEach((logo) => {
      logo.src = logoPath;
    });
  }

  setPartnerLogos(theme) {
    const partnerLogoTheme = theme === 'dark' ? 'light' : 'dark';
    this.partnerLogos.forEach((logo) => {
      const partner = logo.getAttribute('data-partner');
      logo.src = `/icons/partners/${partner}-${partnerLogoTheme}.svg`;
    });
  }

  async applyTheme(theme) {
    this.root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Set icons for all toggle buttons
    await Promise.all(
      Array.from(this.themeToggleButtons).map((btn) =>
        this.setButtonIcon(btn, theme),
      ),
    );

    this.setMainLogos(theme);
    this.setPartnerLogos(theme);
  }

  addEventListeners() {
    this.themeToggleButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const currentTheme = this.root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        await this.applyTheme(newTheme);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
