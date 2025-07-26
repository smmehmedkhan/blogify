# 🛠️ DEVLOG.md — Blogify Developer Log

> A journal of bugs, issues, improvements, and learnings throughout the development of **Blogify** — a full-stack blog application built with **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **raw JavaScript/CSS**.

---

## 📅 2025-07-26 – masonry layout for all blogs card

- **Issue**: Simple grid-box/grid-layout isn't working for dynamically rendered blogs card.
- **Diagnosis**: Blogs card has images, tags & senitize-html, which are rendered dynamically. So blogs card height/width are different from each other. These break normal grid-layout.
- **Fix**: Made a custom masonry-layout using vanilla js. It calculate container height/width dynamically and adjust cards to fit in wrapper container.

---

## 📅 2025-07-03 – route order matters

- **Issue**: '/user/dashboard' route get hanging on every request after adding two new routes path in user routes file.
- **Diagnosis**: /users/dashboard route is shadowed by the /:id route. So it get hanging on every request.
- **Fix**: Always define most specific routes (like /dashboard, /dashboard/add, etc.) before any generic parameter routes (like /:id). To avoid request hanging. Route order matters in express.

---

## 📅 2025-06-22 – CSP Nonce Issue with Helmet + EJS

- **Issue**: Inline `<script>` tags were blocked even after configuring Helmet’s CSP.
- **Diagnosis**: Route handlers didn't pass nonce token when rendered a ejs template file.
- **Fix**: Ensured that every inline script tag in all EJS files used the `nonce` attribute properly. Verified that `res.locals.nonce` was passed to views form route handlers whenever rendered a ejs template.
- **Lesson**: Helmet CSP with nonces requires explicit injection into every view per request. A single missing nonce will cause script blocking.

---

## 📅 2025-06-15 – Middleware order in app.js

- **Issue**: App has been broke after changing middleware order.
- **Diagnosis**: All of important features such as Toast notifications, Email verification, storing sessions in database and so on aren't working.
- **Fix**: Ensured that every part of the app.js file such as session configured, nonce token and helmet middleware, View engine setup, custom middleware, static files, custom middlewares routes and error handler are placed correctly.

- **Lesson**: Changing or miss placing a section in main app file can brake entire apps. Middleware chaining order metters in express app.

---

## 📅 2025-06-02 – Cloudinary Setup for Image Upload

- **Issue**: Needed to implement blog post and profile image upload but unsure how to set up Cloudinary.
- **Fix**: Used `multer`, `cloudinary`, and `multer-storage-cloudinary`. Integrated it with Express route handlers and saved image URLs to MongoDB.
- **Lesson**: Use the Cloudinary dashboard to get credentials. Upload via middleware and store secure URLs in database schema.

---

## 📅 2025-06-01 – Display Card for "No Blog Posts Found"

- **Issue**: Wanted to show a custom message when no blog posts are present.
- **Fix**: Created a styled card using EJS conditionals and raw CSS that renders only when `posts.length === 0`.
- **Enhancement**: Made the card responsive for mobile view.
- **Lesson**: Empty-state UI boosts user experience. Even small features like this improve app professionalism.

---

## 📅 2025-06-16 – Express App.js Structure and Layout

- **Issue**: Needed guidance on properly structuring `app.js` for scalability.
- **Fix**: Refactored middleware setup, route organization, view engine (EJS), and static asset setup. Used `express-ejs-layouts` for consistent page structure.
- **Lesson**: A clean and modular `app.js` makes debugging, scaling, and maintenance easier.

---

## 📅 2025-05-30 – Session Cookie Expiry Issue

- **Issue**: Users were getting logged out too quickly or unexpectedly.
- **Fix**: Reviewed and corrected `express-session` settings — added `cookie.maxAge`, and adjusted `resave` and `saveUninitialized` options.
- **Lesson**: Proper session setup is critical for authentication flow. Misconfigured cookie settings can cause frustrating user behavior.

---

## 📅 2025-05-30 – Image Upload Working but Not Showing

- **Issue**: Uploaded image was stored but not showing in views.
- **Diagnosis**: Image URL was not correctly saved to the database or passed to the view.
- **Fix**: Ensured that the Cloudinary response was parsed correctly, URL saved in the post schema, and passed to the EJS template.
- **Lesson**: Every part of the upload→DB→view pipeline must be verified. Log values during debugging.

---

## 📅 2025-06-02 – Blogify Code Review and Improvements

- **Feedback**: Improved code structure, removed redundant comments, and cleaned up route handlers.
- **Enhancement**: Planned to improve UI/UX, introduce better CSS design, and add additional features like search or filters.
- **Lesson**: Regularly reviewing your own code or getting external feedback sharpens your professional habits.

---

## 📅 2025-06-08 – Project Deployment Planning

- **Next Steps**: After fixing bugs and finalizing UI polish, planned to deploy on platforms like **Render**, **Railway**, or **Vercel**.
- **Checklist**: Secure environment variables, connect MongoDB Atlas, and ensure production error handling.
- **Lesson**: Deployment involves configuration, not just pushing code. Test everything thoroughly before going live.

---

## 📅 2025-03 to 2025-06 – Overall Journey

- **Time Spent**: \~3 months of iterative development.
- **Stack Used**: Node.js, Express.js, MongoDB, Mongoose, EJS, Cloudinary, Multer, raw JS/CSS.
- **Growth**: Learned real-world debugging, middleware flow, view rendering, session management, and secure content policies.

---

**📌 Final Thought**:

> _“This project wasn't just about building a blog app — it was about building resilience, real-world dev habits, and confidence in solving problems step-by-step.”_
