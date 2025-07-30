document.addEventListener('DOMContentLoaded', async () => {
  const input =
    document.getElementById('addPostTags') ||
    document.getElementById('editPostTags');
  if (!input) return;

  // For edit-post: use server-sent tags, for add-post: fetch from API
  let tagList = JSON.parse(input.dataset.allTags || '[]');
  if (!tagList.length) {
    try {
      const res = await fetch('/api/tags');
      if (res.ok) tagList = await res.json();
    } catch (error) {
      console.warn('Failed to fetch tags:', error);
    }
  }

  const tagify = new Tagify(input, {
    whitelist: tagList,
    dropdown: {
      enabled: 0,
      maxItems: Infinity,
      classname: 'tags-look',
      closeOnSelect: false,
    },
  });

  // Set initial tags only for edit-post
  const initialTags = JSON.parse(input.dataset.initialTags || '[]');
  if (initialTags.length) tagify.addTags(initialTags);

  // Convert tags on form submit
  input.closest('form')?.addEventListener('submit', () => {
    input.value = tagify.value.map((tag) => tag.value).join(',');
  });
});
