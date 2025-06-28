document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const container = document.getElementById('blogsContainer');

  if (!searchForm || !container) return;

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const searchTerm = searchInput.value.toLowerCase().trim();

    // Make AJAX request
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1],
      },
      body: JSON.stringify({ searchTerm }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.blogs && data.blogs.length > 0) {
          container.innerHTML = '';

          // Update heading if needed
          const blogsHeader = document.querySelector('.blogs_header h2');
          if (blogsHeader) {
            blogsHeader.textContent = 'Search Results';
          }

          // Add search results
          data.blogs.forEach((blog) => {
            const li = document.createElement('li');
            const dateString = new Date(blog.createdAt).toDateString();

            li.innerHTML = `
            <a href="/blog/${blog._id}">
              <div class="blog_card">
                <h4>${blog.title}</h4>
                <span class="article_date">
                  <i class="fa-solid fa-calendar-days"></i>
                  ${dateString}
                </span>
                <div class="blog_card-contents">
                  ${
                    blog.coverImage?.url
                      ? `<div class="image-container">
                      <img src="${blog.coverImage.url}" alt="${blog.title}" loading="lazy">
                    </div>`
                      : `<div class="text-container">
                      ${blog.descriptions}
                    </div>`
                  }
                </div>
              </div>
            </a>
          `;

            container.appendChild(li);
          });

          // Fix pagination reference
          const pagination = document.querySelector('.pagination');
          if (pagination) {
            pagination.style.display = 'none';
          }
        } else {
          // Fix variable name - use container instead of latestBlogs
          container.innerHTML =
            '<div class="empty-post"><p>No blogs found matching your search.</p></div>';

          const pagination = document.querySelector('.pagination');
          if (pagination) {
            pagination.style.display = 'none';
          }
        }
      })
      .catch((error) => {
        console.error('Search error:', error);
        // Show user-friendly error message
        container.innerHTML =
          '<p class="error">Sorry, something went wrong with your search. Please try again.</p>';
      });
  });
});
