document.addEventListener('DOMContentLoaded', async () => {
  const button = document.getElementById('resendBtn');

  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      const bundle = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await fetch('/auth/verify/resend', bundle);
      button.disabled = false;
    } catch (error) {
      button.disabled = false;
      console.error('Error:', error);
    }
  });
});
