import MarkdownIt from 'markdown-it';
import sanitize from 'sanitize-html';
import striptags from 'striptags';
import TurndownService from 'turndown';

import userService from '../services/user.service.js';
import tagService from '../services/tag.service.js';
import { cloudinary } from '../utils/cloudinary.utils.js';
import handleError from '../utils/handleError.utils.js';

// Initialize markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  xhtmlOut: true,
  langPrefix: 'language-',
}).enable(['image']);

// Initialize turndown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

/**
 * User Profile
 * Render user profile page
 */
export async function userProfile(req, res) {
  const nonce = res.locals.nonce;
  const userId = req.user._id;
  const locals = {
    title: `Blogify | ${req.user.name || req.user.username}`,
    description: 'Explore your account content and  settings.',
  };

  if (!userId) {
    req.flash('info', 'Please sign in first to get in profile page.');
    return redirect('/auth/sign-in');
  }

  try {
    const userDetails = await userService.getUserDetails(userId);
    const posts = await userService.getUserPosts(userId, 6);

    // Senitize posts descriptions
    const sanitizedPosts = posts.map((post) => {
      const plainPost = post.toObject();

      return {
        ...plainPost,
        createdAt: post.createdAt ? new Date(post.createdAt) : null,
        descriptions: striptags(post.descriptions),
      };
    });

    const bundle = {
      nonce,
      locals,
      currentRoute: '/users',
      user: userDetails,
      posts: sanitizedPosts,
    };

    return await res.render('pages/user/profile', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * User Profile update
 * Update user profile via edit profile form.
 */
export async function userProfileEdit(req, res) {
  const nonce = res.locals.nonce;
  const userId = req.user._id;
  const locals = {
    title: `Blogify | @${req.user.username}`,
    description: `Update @${req.user.username}'s profile informations`,
  };

  try {
    const userDetails = await userService.getUserDetails(userId);

    const bandle = {
      nonce,
      locals,
      currentRoute: '/users',
      user: userDetails,
    };

    return await res.render('pages/user/edit-profile', bandle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * User Profile update
 * Update user profile via edit profile form.
 */
export async function userProfileUpdate(req, res) {
  const userId = req.params.id;
  const {
    name,
    username,
    bio,
    profession,
    photo,
    city,
    state,
    country,
    facebook,
    instagram,
    twitter,
    linkedin,
    website,
  } = req.body;

  try {
    // Create update data object
    const updateData = {
      name,
      username,
      bio,
      profession,
      photo,
      location: {
        city,
        state,
        country,
      },
      socials: {
        facebook,
        instagram,
        twitter,
        linkedin,
        website,
      },
    };

    // If a new image was uploaded, update the image data
    if (req.file) {
      const userDetails = await userService.getUserDetails(userId);
      if (userDetails.photo?.public_id) {
        await cloudinary.uploader.destroy(userDetails.photo.public_id);
      }

      // Add the new image data
      updateData.photo = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    // Update the user
    await userService.updateUserDetails(userId, updateData);

    req.flash('success', 'Your profile informations updated successfully');
    return res.redirect('/users');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Render profile preview page
 */
export async function userProfilePreview(req, res) {
  const nonce = res.locals.nonce;
  const username = req.params.username;
  const userId = res.locals.user?._id;

  try {
    // Find user by username
    const userDetails = await userService.previewUserDetails(username);

    let isFollowing;
    if (userDetails.followers.includes(userId)) {
      isFollowing = true;
    } else {
      isFollowing = false;
    }

    // Handle user not found
    if (!userDetails) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    // Fetch posts by user _id
    const posts = await userService.getUserPosts(userDetails._id, 6);

    // Senitize posts descriptions
    const sanitizedPosts = posts.map((post) => {
      const plainPost = post.toObject();

      return {
        ...plainPost,
        createdAt: post.createdAt ? new Date(post.createdAt) : null,
        descriptions: striptags(post.descriptions),
      };
    });

    const locals = {
      title: `Blogify | ${userDetails?.name || userDetails.username}`,
      description: `Preview ${userDetails?.name || userDetails.username}'s profile`,
    };

    const bundle = {
      nonce,
      locals,
      isFollowing,
      targetUser: userDetails,
      posts: sanitizedPosts,
      currentUser: res.locals.user,
      currentRoute: `/users/${username}`,
    };

    return await res.render('pages/user/profile-preview', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 *  Handle user follow request
 */
export async function followUser(req, res) {
  const userId = req.user._id;
  const targetUsername = req.params.username;

  try {
    const userDetails = await userService.getUserDetails(userId);
    const targetUser = await userService.previewUserDetails(targetUsername);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (userDetails.username === targetUsername)
      return res.status(400).json({ error: "You can't follow yourself." });

    // Add following/followers if not already following
    if (!targetUser.followers.includes(userId)) {
      await userService.follow(userDetails, targetUser);
    }

    // Return json message for client-side scripts
    return res.json({ success: true });
  } catch (error) {
    handleError(res, error);
  }
}

/**
 *  Handle user unfollow request
 */
export async function unfollowUser(req, res) {
  const userId = req.user._id;
  const targetUsername = req.params.username;

  try {
    const userDetails = await userService.getUserDetails(userId);
    const targetUser = await userService.previewUserDetails(targetUsername);
    if (!targetUser) return res.status(404).json({ error: 'User not found' });

    if (userDetails.username === targetUsername)
      return res.status(400).json({ error: "You can't unfollow yourself." });

    // Remove from following/followers if following
    if (targetUser.followers.includes(userId)) {
      await userService.unfollow(userDetails, targetUser);
    }

    // Return json message for client-side scripts
    return res.json({ success: true });
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
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Dashboard',
    description: 'You can view, add, edit or delete all of your post',
  };

  try {
    const blogs = await userService.getUserBlogs(userId);

    const bundle = {
      nonce,
      locals,
      blogs: blogs || [],
      currentRoute: '/users/dashboard',
      user: req.user,
    };

    return await res.render('pages/user/dashboard', bundle);
  } catch (err) {
    handleError(res, err);
    if (!res.headersSent) res.status(500).send('Internal Server Error');
  }
}

/**
 * Render add blog page
 */
export async function addBlogPage(req, res) {
  const user = req.user;
  const nonce = res.locals.nonce;
  const locals = {
    title: 'Blogify | Add Blog',
    descriptions: 'You can add new blog.',
  };

  try {
    const tags = await tagService.getAllTags();
    const bandle = {
      nonce,
      locals,
      currentRoute: '/users/dashboard/add',
      user,
      tags,
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
  let { addPostTitle, addPostTextArea, addPostTags, ...rest } = req.body;
  const userId = req.user._id;
  const author = req.user.username;

  try {
    // Convert markdown to HTML
    const htmlContent = md.render(addPostTextArea);

    // Sanitize blog descriptions
    const sanitizeContent = sanitize(htmlContent, {
      allowedTags: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'p',
        'a',
        'ul',
        'ol',
        'nl',
        'li',
        'b',
        'i',
        'strong',
        'em',
        'strike',
        'code',
        'hr',
        'br',
        'div',
        'table',
        'thead',
        'caption',
        'tbody',
        'tr',
        'th',
        'td',
        'pre',
        'img',
        'video',
        'audio',
        'source',
        'span',
      ],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'alt', 'width', 'height', 'title'],
        video: ['controls', 'width', 'height'],
        audio: ['controls'],
        source: ['src', 'type'],
        pre: ['class'],
        code: ['class'],
        span: ['class'],
      },
      // Restrict URLs to http, https, mailto
      allowedSchemes: ['http', 'https', 'mailto'],
    });

    let tags = [];
    if (typeof addPostTags === 'string') {
      tags = addPostTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(addPostTags)) {
      tags = addPostTags;
    }

    await tagService.addTagNames(tags);

    // Create blog data object
    const blogData = {
      title: addPostTitle,
      descriptions: sanitizeContent,
      userId,
      author,
      tags,
      ...rest,
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
  const nonce = res.locals.nonce;
  const blogId = req.params.id;
  const locals = {
    title: 'Blogify | Edit Blog',
    descriptions: 'You can edit or delete your blog.',
  };

  try {
    const blog = await userService.getBlogById(blogId);

    if (!blog) {
      req.flash('error', 'Blog not found');
      return res.redirect('/users/dashboard');
    }

    // Convert HTML to Markdown
    const markdownContent = turndownService.turndown(blog.descriptions);

    const tags = await tagService.getAllTags();

    const bandle = {
      nonce,
      locals,
      blog: {
        ...blog.toObject(),
        descriptions: markdownContent,
      },
      tags,
      currentRoute: '/users/dashboard/edit',
      user: req.user,
    };

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
  const { editPostTitle, editPostTextArea, editPostTags, ...rest } = req.body;

  try {
    let tags = [];
    if (typeof editPostTags === 'string') {
      tags = editPostTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(editPostTags)) {
      tags = editPostTags;
    }

    // Ensure tags exist in Tag collection
    await tagService.addTagNames(tags);

    // Convert markdown to HTML
    const htmlContent = md.render(editPostTextArea);

    // Sanitize blog descriptions
    const sanitizeContent = sanitize(htmlContent, {
      allowedTags: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'p',
        'a',
        'ul',
        'ol',
        'nl',
        'li',
        'b',
        'i',
        'strong',
        'em',
        'strike',
        'code',
        'hr',
        'br',
        'div',
        'table',
        'thead',
        'caption',
        'tbody',
        'tr',
        'th',
        'td',
        'pre',
        'img',
        'video',
        'audio',
        'source',
        'span',
      ],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'alt', 'width', 'height', 'title'],
        video: ['controls', 'width', 'height'],
        audio: ['controls'],
        source: ['src', 'type'],
        pre: ['class'],
        code: ['class'],
        span: ['class'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    });

    // Create update data object
    const updateData = {
      title: editPostTitle,
      descriptions: sanitizeContent,
      tags,
      ...rest,
    };

    // If a new image was uploaded, update the image data
    if (req.file) {
      const existingBlog = await userService.getBlogById(blogId);
      if (existingBlog?.coverImage?.public_id) {
        await cloudinary.uploader.destroy(existingBlog.image.public_id);
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
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    // Check if AJAX request
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.json({
        success: true,
        message: 'Your post deleted successfully',
        blogId,
      });
    }

    req.flash('success', 'Your post deleted successfully');
    return res.redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}
