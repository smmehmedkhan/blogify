document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
  const followBtn = document.getElementById('followBtn');
  const unfollowBtn = document.getElementById('unfollowBtn');
  const username = window.location.pathname.split('/').pop(); // Find username from url

  // Handle follow clicks
  if (followBtn) {
    followBtn.addEventListener('click', async () => {
      const res = await fetch(`/users/${username}/follow`, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Reload window
        window.location.reload();
      }
    });
  }

  // Handle unfollow clicks
  if (unfollowBtn) {
    unfollowBtn.addEventListener('click', async () => {
      const res = await fetch(`/users/${username}/unfollow`, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Reload window
        window.location.reload();
      }
    });
  }
});
