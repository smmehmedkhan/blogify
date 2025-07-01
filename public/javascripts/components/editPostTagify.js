document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('editPostTags');
  if (!input) return;

  // Use global variables set in EJS
  const initialTags = JSON.parse(input.dataset.initialTags || '[]');
  const tagList = JSON.parse(input.dataset.allTags || '[]');

  // Initialize Tagify with whitelist and initial value
  const tagify = new Tagify(input, {
    whitelist: tagList,
    dropdown: {
      enabled: 0,
      maxItems: 20,
      classname: 'tags-look',
      closeOnSelect: false,
    },
  });

  // Set initial tags
  tagify.addTags(initialTags);

  // On form submit, convert tag objects to string array
  const form = input.closest('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const tags = tagify.value.map((tag) => tag.value);
      input.value = tags.join(','); // Send as comma-separated string
    });
  }
});
