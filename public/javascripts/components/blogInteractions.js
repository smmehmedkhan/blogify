/**
 * Blog Interactions JavaScript
 * Handles client-side interactions for likes, dislikes, comments, and shares
 */
document.addEventListener('DOMContentLoaded', function () {
  const blogId = document.getElementById('blog-container').dataset.blogId;
  const likeButton = document.getElementById('likeBtn');
  const likeCounter = document.getElementById('likeCounter');
  const dislikeButton = document.getElementById('dislikeBtn');
  const dislikeCounter = document.getElementById('dislikeCounter');
  const shareButton = document.getElementById('shareButton');

  // Like Button's functionality
  likeButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`/blog/${blogId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        likeCounter.textContent = data.likes;
        dislikeCounter.textContent = data.dislikes;

        // Update button states
        if (data.userLiked) {
          likeButton.classList.add('active');
        } else {
          likeButton.classList.remove('active');
        }

        if (data.userDisliked) {
          dislikeButton.classList.add('active');
        } else {
          dislikeButton.classList.remove('active');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Dislike button's functionality
  dislikeButton.addEventListener('click', async function () {
    try {
      const response = await fetch(`/blog/${blogId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        likeCounter.textContent = data.likes;
        dislikeCounter.textContent = data.dislikes;

        // Update button states
        if (data.userDisliked) {
          dislikeButton.classList.add('active');
        } else {
          dislikeButton.classList.remove('active');
        }

        if (data.userLiked) {
          likeButton.classList.add('active');
        } else {
          likeButton.classList.remove('active');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Share functionality
  shareButton.addEventListener('click', async () => {
    const blogUrl = window.location.href;
    const blogTitle = document.querySelector('.blog-title').textContent;

    // Open share dialog
    if (navigator.share) {
      navigator
        .share({
          title: blogTitle,
          url: blogUrl,
        })
        .then(async () => {
          // Increment share count
          try {
            const response = await fetch(`/blog/${blogId}/share`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              document.getElementById('share-count').textContent =
                data.shareCount;
            }
          } catch (error) {
            console.error('Error:', error);
          }
        })
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported on this browser.');
    }
  });
});
