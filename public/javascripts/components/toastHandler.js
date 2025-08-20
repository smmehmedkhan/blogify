import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

class ToastManager {
  constructor() {
    this.config = {
      duration: 5000,
      close: true,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
    };

    this.styles = {
      success: {
        background: 'var(--color-success)',
        color: 'black',
        maxWidth: '400px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-sm)',
        boxShadow: 'var(--shadow-md)',
      },
      error: {
        background: 'var(--color-error)',
        color: 'black',
        maxWidth: '400px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-sm)',
        boxShadow: 'var(--shadow-md)',
      },
      warning: {
        background: 'var(--color-warning)',
        color: 'black',
        maxWidth: '400px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-sm)',
        boxShadow: 'var(--shadow-md)',
      },
      info: {
        background: 'var(--color-info)',
        color: 'black',
        maxWidth: '400px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--font-sm)',
        boxShadow: 'var(--shadow-md)',
      },
    };
  }

  show(type, message) {
    Toastify({
      text: message,
      avatar: `/icons/${type}.svg`,
      style: this.styles[type],
      ...this.config,
    }).showToast();
  }

  async fetchAndShowToasts() {
    try {
      const res = await fetch('/api/toasts', { credentials: 'same-origin' });
      if (!res.ok) return;
      const toasts = await res.json();
      toasts.forEach((toast) => this.show(toast.type, toast.message));
    } catch (error) {
      console.log(error);
    }
  }

  init() {
    this.fetchAndShowToasts();
  }
}

// Initialize and make globally available
document.addEventListener('DOMContentLoaded', () => {
  window.toast = new ToastManager();
  window.toast.init();
});
