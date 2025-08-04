document.addEventListener('DOMContentLoaded', function () {
  const btns = document.querySelectorAll('.delete__post');

  btns.forEach((btn) => {
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
            const postElem = btn.closest('.post');
            if (postElem) postElem.remove();
            // Show toast
            window.toast.show('success', 'Post deleted successfully!');
          } else {
            window.toast.show(
              'error',
              data.message || 'Failed to delete post.',
            );
          }
        } catch (error) {
          window.toast.show('error', 'An error occurred.');
          console.log(error);
        }
      }
    });
  });
});
