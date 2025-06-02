/**
 * Blog Interactions JavaScript
 * Handles client-side interactions for likes, dislikes, comments, and shares
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get blog ID from the page
  const blogId = document.getElementById('blog-container').dataset.blogId;
  
  // Like button functionality
  const likeButton = document.getElementById('like-button');
  if (likeButton) {
    likeButton.addEventListener('click', async function() {
      try {
        const response = await fetch(`/blog/${blogId}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          document.getElementById('like-count').textContent = data.likes;
          document.getElementById('dislike-count').textContent = data.dislikes;
          
          // Update button states
          if (data.userLiked) {
            likeButton.classList.add('active');
          } else {
            likeButton.classList.remove('active');
          }
          
          if (data.userDisliked) {
            document.getElementById('dislike-button').classList.add('active');
          } else {
            document.getElementById('dislike-button').classList.remove('active');
          }
        } else {
          // If not logged in, redirect to login page
          if (response.status === 401) {
            window.location.href = '/auth/sign-in';
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
  
  // Dislike button functionality
  const dislikeButton = document.getElementById('dislike-button');
  if (dislikeButton) {
    dislikeButton.addEventListener('click', async function() {
      try {
        const response = await fetch(`/blog/${blogId}/dislike`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          document.getElementById('like-count').textContent = data.likes;
          document.getElementById('dislike-count').textContent = data.dislikes;
          
          // Update button states
          if (data.userDisliked) {
            dislikeButton.classList.add('active');
          } else {
            dislikeButton.classList.remove('active');
          }
          
          if (data.userLiked) {
            document.getElementById('like-button').classList.add('active');
          } else {
            document.getElementById('like-button').classList.remove('active');
          }
        } else {
          // If not logged in, redirect to login page
          if (response.status === 401) {
            window.location.href = '/auth/sign-in';
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
  
  // Share functionality
  const shareButtons = document.querySelectorAll('.share-button');
  shareButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const platform = this.dataset.platform;
      const blogUrl = window.location.href;
      const blogTitle = document.querySelector('.blog-title').textContent;
      
      let shareUrl;
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blogTitle)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(blogTitle + ' ' + blogUrl)}`;
          break;
      }
      
      // Open share dialog
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        
        // Increment share count
        try {
          const response = await fetch(`/blog/${blogId}/share`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            document.getElementById('share-count').textContent = data.shareCount;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  });
  
  // Comment form submission
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const commentContent = document.getElementById('comment-content').value;
      
      if (!commentContent.trim()) {
        return;
      }
      
      try {
        const response = await fetch(`/blog/${blogId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: commentContent })
        });
        
        if (response.ok) {
          const comment = await response.json();
          
          // Add the new comment to the list
          addCommentToDOM(comment);
          
          // Clear the form
          document.getElementById('comment-content').value = '';
        } else {
          // If not logged in, redirect to login page
          if (response.status === 401) {
            window.location.href = '/auth/sign-in';
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
  
  // Function to add a new comment to the DOM
  function addCommentToDOM(comment) {
    const commentsList = document.getElementById('comments-list');
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.dataset.commentId = comment._id;
    
    const commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    
    const commentUser = document.createElement('span');
    commentUser.className = 'comment-user';
    commentUser.textContent = comment.userId.username;
    
    const commentDate = document.createElement('span');
    commentDate.className = 'comment-date';
    commentDate.textContent = new Date(comment.createdAt).toLocaleDateString();
    
    commentHeader.appendChild(commentUser);
    commentHeader.appendChild(commentDate);
    
    const commentContent = document.createElement('div');
    commentContent.className = 'comment-content';
    commentContent.textContent = comment.content;
    
    commentElement.appendChild(commentHeader);
    commentElement.appendChild(commentContent);
    
    // Add delete button if the comment is by the current user
    if (comment.userId._id === document.getElementById('blog-container').dataset.userId) {
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-comment-button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async function() {
        try {
          const response = await fetch(`/blog/${blogId}/comments/${comment._id}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            commentElement.remove();
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
      
      commentElement.appendChild(deleteButton);
    }
    
    // Add the comment at the beginning of the list
    commentsList.insertBefore(commentElement, commentsList.firstChild);
  }
  
  // Load comments on page load
  async function loadComments() {
    try {
      const response = await fetch(`/blog/${blogId}/comments`);
      
      if (response.ok) {
        const comments = await response.json();
        
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '';
        
        comments.forEach(comment => {
          addCommentToDOM(comment);
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Load comments when the page loads
  if (document.getElementById('comments-list')) {
    loadComments();
  }
});