document.addEventListener('DOMContentLoaded', function () {
  // Status change handler
  const statusSelect = document.getElementById('status-select');
  statusSelect.addEventListener('change', function () {
    const messageId = this.getAttribute('data-message-id');
    const newStatus = this.value;

    fetch(`/admin/contact/${messageId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute('content'),
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Toastify({
            text: 'Status updated successfully',
            style: {
              color: 'hsl(0 0% 98%)',
              background: 'hsl(160.1 84.1% 39.4%)',
            },
            duration: 3000,
          }).showToast();
        } else {
          Toastify({
            text: data.message || 'Error updating status',
            style: {
              color: 'hsl(0 0% 98%)',
              background: 'hsl(0 72.2% 50.6%)',
            },
            duration: 3000,
          }).showToast();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Toastify({
          text: 'An error occurred while updating status',
          style: {
            color: 'hsl(0 0% 98%)',
            background: 'hsl(0 72.2% 50.6%)',
          },
          duration: 3000,
        }).showToast();
      });
  });
});
