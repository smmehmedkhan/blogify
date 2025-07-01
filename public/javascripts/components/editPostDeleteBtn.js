document.getElementById('deletePost')?.addEventListener('click', function () {
  if (confirm('Are you sure you want to delete this post?')) {
    fetch(`/users/dashboard/delete/${this.dataset.blogId}?_method=DELETE`, {
      method: 'POST',
      headers: {
        'CSRF-Token': document.querySelector('input[name="_csrf"]').value,
      },
    }).then((res) => {
      if (res.ok) {
        window.location.href = '/users/dashboard';
      } else {
        alert('Failed to delete post.');
      }
    });
  }
});
