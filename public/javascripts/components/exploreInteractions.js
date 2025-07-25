document.addEventListener('DOMContentLoaded', function () {
  // Auto-submit when sort options change
  const sortBySelect = document.getElementById('sortBy');
  const sortOrderSelect = document.getElementById('sortOrder');

  if (sortBySelect && sortOrderSelect) {
    sortBySelect.addEventListener('change', function () {
      this.closest('form').submit();
    });

    sortOrderSelect.addEventListener('change', function () {
      this.closest('form').submit();
    });
  }

  // Handle tag selection with real-time updates
  const tagCheckboxes = document.querySelectorAll(
    '.tag__item input[type="checkbox"]',
  );
  const tagForm = document.querySelector('.tags__form');

  if (tagCheckboxes.length && tagForm) {
    tagCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', function () {
        // Add a small delay to allow multiple selections before submitting
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          tagForm.submit();
        }, 500);
      });
    });
  }
});
