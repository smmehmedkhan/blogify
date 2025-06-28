document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('deletePost');

  btn.addEventListener('click', async function () {
    const blogId = this.getAttribute('data-blog-id');
    if (
      confirm(
        'Are you sure you want to delete this post? This action cannot be undone.',
      )
    ) {
      try {
        const res = await fetch(`/users/dashboard/delete/${blogId}`, {
          method: 'DELETE',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          // Remove the blog card from the DOM
          const card = btn.closest('li') || btn.closest('.user_blog-card');
          if (card) card.remove();
          Toastify({
            text: data.message || 'Post deleted!',
            style: {
              background: 'linear-gradient(90deg, #22c55e, #16a34a)',
              color: '#fff',
            },
            duration: 4000,
            close: true,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
          }).showToast();
        } else {
          Toastify({
            text: data.message || 'Failed to delete post.',
            style: {
              background: 'linear-gradient(90deg, #ef4444, #b91c1c)',
              color: '#fff',
            },
            duration: 4000,
            close: true,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
          }).showToast();
        }
      } catch (err) {
        Toastify({
          text: 'Error deleting post.',
          style: {
            background: 'linear-gradient(90deg, #ef4444, #b91c1c)',
            color: '#fff',
          },
          duration: 4000,
          close: true,
          gravity: 'bottom',
          position: 'right',
          stopOnFocus: true,
        }).showToast();
      }
    }
  });
});
