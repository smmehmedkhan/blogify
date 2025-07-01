document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('addPostTags');
  if (!input) return;

  // Fetch tags from your server
  const res = await fetch('/api/tags');
  let tagList = [];
  if (res.ok) {
    tagList = await res.json();
  }

  // Initialize Tagify
  const tagify = new Tagify(input, {
    whitelist: tagList,
    dropdown: {
      enabled: 0,
      maxItems: Infinity,
      classname: 'tags-look',
      closeOnSelect: false,
    },
  });

  // On form submit, send new tags to server
  const form = input.closest('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // Convert array of object to array of strings
      const tags = tagify.value.map((tag) => tag.value);
      input.value = tags.join(','); // Send as comma-separated string
    });
  }
});
