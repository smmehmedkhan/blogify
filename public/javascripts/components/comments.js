document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');
  const blogContainer = document.getElementById('blogContainer');
  const blogId = blogContainer?.dataset.blogId;
  const currentUserId = blogContainer?.dataset.userId;
  const csrfInput = document.querySelector('input[name="_csrf"]');
  const csrfToken = csrfInput ? csrfInput.value : '';

  if (!commentForm || !commentsList) return;

  // Submit new comment
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const commentContent = document
      .getElementById('commentContent')
      .value.trim();

    if (!commentContent) return;

    try {
      const response = await fetch(`/blog/${blogId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (response.ok) {
        const comment = await response.json();
        addCommentToDOM(comment);
        commentContent.value = '';
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Create comment element
  function addCommentToDOM(comment) {
    const commentElement = document.createElement('li');
    commentElement.className = 'card comment';
    commentElement.dataset.commentId = comment._id;

    commentElement.innerHTML = `
      <div class="fluid comment__header">
        <div class="inline__container comment__user">
          <i class="fa-solid fa-at"></i>
          <span>${comment.userId.username}</span>
        </div>
        <div class="tags comment__date">
          <i class="fa-solid fa-calendar-days"></i>
          ${new Date(comment.createdAt).toLocaleDateString()}
        </div>
      </div>
      <p class="comment__content">${comment.content}</p>
    `;

    // Add delete button if comment is by current user
    if (comment.userId._id === currentUserId) {
      const deleteButton = document.createElement('button');
      deleteButton.className = 'inline__container comment__delete-btn';
      deleteButton.innerHTML = `
        <span>Delete</span>
        <i class="fa-solid fa-delete-left"></i>
      `;
      deleteButton.onclick = async () => await deleteComment(comment._id);
      commentElement.appendChild(deleteButton);
    }

    commentsList.insertBefore(commentElement, commentsList.firstChild);
  }

  // Delete comment
  async function deleteComment(commentId) {
    try {
      const response = await fetch(`/blog/${blogId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (response.ok) {
        document.querySelector(`[data-comment-id="${commentId}"]`)?.remove();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Load & Initialize all comments
  (async function loadComments() {
    try {
      const response = await fetch(`/blog/${blogId}/comments`);

      if (response.ok) {
        const comments = await response.json();
        commentsList.innerHTML = '';
        comments.forEach(addCommentToDOM);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })();
});
