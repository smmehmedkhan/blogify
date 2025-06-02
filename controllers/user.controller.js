import handleError from '../utils/handleError.utils.js';
import userService from '../services/user.service.js';

/**
 * User Panel
 * Render user panel page
 */
export async function userPanel(req, res) {
  const locals = {
    title: 'Blogify | Profile',
    description: 'You can explore your content and account settings.',
  };

  try {
    const bandle = {
      locals,
      currentRoute: '/users',
      user: req.user,
    };
    return await res.render('pages/user/index', bandle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * User Dashboard
 * Render user dashboard with their blogs
 */
export async function userDashboard(req, res) {
  const userId = req.user._id;
  const locals = {
    title: 'Blogify | Dashboard',
    description: 'You can view, add, edit or delete all of your post',
  };

  try {
    const blogs = await userService.getUserBlogs(userId);
    const bandle = {
      locals,
      blogs,
      currentRoute: '/users/dashboard',
      user: req.user,
    };

    return await res.render('pages/user/dashboard', bandle);
  } catch (err) {
    handleError(res, err);
  }
}

/**
 * Render add blog page
 */
export async function addBlogPage(req, res) {
  const locals = {
    title: 'Blogify | Add Blog',
    descriptions: 'You can add new blog.',
  };

  try {
    const bandle = {
      locals,
      currentRoute: '/users/dashboard/add',
      user: req.user,
    };

    return await res.render('pages/user/add-post', bandle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Add Blog
 * Handle adding a new blog
 */
export async function addABlog(req, res) {
  const { title, descriptions } = req.body;
  const userId = req.user._id;

  try {
    // Create blog data object
    const blogData = {
      title,
      descriptions,
      userId,
    };

    // If an image was uploaded, add it to the blog data
    if (req.file) {
      blogData.coverImage = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    // Create the blog with the image data
    await userService.createBlog(blogData);
    req.flash('success', 'Your post added successfully');
    return res.redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Render update blog page
 */
export async function updateBlogPage(req, res) {
  const blogId = req.params.id;
  const locals = {
    title: 'Blogify | Edit Blog',
    descriptions: 'You can edit or delete your blog.',
  };

  try {
    const blog = await userService.getBlogById(blogId);
    const bandle = {
      locals,
      blog,
      currentRoute: '/users/dashboard/edit',
      user: req.user,
    };

    if (!blog) {
      req.flash('error', 'Blog not found');
      return res.redirect('/users/dashboard');
    }

    return await res.render('pages/user/edit-post', bandle);
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Update blog
 * Handle updating a blog
 */
export async function updateABlog(req, res) {
  const blogId = req.params.id;
  const { title, descriptions } = req.body;

  try {
    // Create update data object
    const updateData = {
      title,
      descriptions,
    };

    // If a new image was uploaded, update the image data
    if (req.file) {
      const existingBlog = await userService.getBlogById(blogId);
      if (existingBlog?.coverImage?.public_id) {
        // Optional: Delete the old image from Cloudinary
        // await cloudinary.uploader.destroy(existingBlog.image.public_id);
      }

      // Add the new image data
      updateData.coverImage = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    // Update the blog
    await userService.updateBlog(blogId, updateData);

    req.flash('success', 'Your post updated successfully');
    return res.redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Delete blog
 * Handle deleting a blog
 */
export async function deleteBlog(req, res) {
  const blogId = req.params.id;
  try {
    // Get the blog first to access its image data
    const blog = await userService.getBlogById(blogId);

    await userService.deleteBlog(blogId);

    // If the blog had an image, delete it from Cloudinary
    if (blog?.coverImage?.public_id) {
      // Optional: Delete the image from Cloudinary
      // await cloudinary.uploader.destroy(blog.image.public_id);
    }

    req.flash('success', 'Your post deleted successfully');
    return res.redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}
