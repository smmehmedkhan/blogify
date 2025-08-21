document
  .getElementById('deleteAccountBtn')
  .addEventListener('click', async () => {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      try {
        const userId = window.location.pathname.split('/').pop();
        await fetch(`/users/delete/${userId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.log(error);
      }

      window.location.href = '/';
    }
  });
