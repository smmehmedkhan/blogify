# Blogify

A modern blogging platform built with Node.js, Express, and MongoDB.

## Features

| Feature                  | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| User Authentication      | Sign-up and sign-in functionality with secure password handling using bcrypt |
| Email Verification       | Email verification system for new user accounts                              |
| Password Reset           | Secure password reset functionality via email                                |
| User Management          | User profiles and account management                                         |
| Blog Creation            | Users can create, edit, and delete their blog posts                          |
| Image Upload             | Cloudinary integration for image uploads and storage                         |
| Blog Interaction         | Like, dislike, and share functionality for blog posts                        |
| Commenting System        | Users can add and delete comments on blog posts                              |
| Search Functionality     | Search capability to find specific blog posts                                |
| User Dashboard           | Personal dashboard for users to manage their content                         |
| Responsive Design        | CSS components for various screen sizes                                      |
| Security Features        | Helmet for HTTP security headers, strong password validation                 |
| Session Management       | User sessions with express-session and MongoDB storage                       |
| Error Handling           | Custom error handling middleware with flash messages                         |
| SEO Features             | Proper metadata and site structure for search engines                        |
| Social Media Integration | Share counts and social media links                                          |
| About Page               | Information about the website/company                                        |
| Contact Page             | Contact form or information                                                  |

## Project Structure

```
blogify/
├── app.js                  # Application configuration
├── server.js               # Server entry point
├── package.json            # Project dependencies
├── .env                    # Environment variables
│
├── .configs/               # Configuration files
│   ├── db.js               # Database configuration
│   ├── env.js              # Environment variables export
│   ├── session.js          # Session configuration
│   └── helmet.js           # Helmet security configuration
│
├── controllers/            # Request handlers
│   ├── auth.controller.js  # Authentication controller
│   ├── blog.controller.js  # Blog post controller
│   ├── comment.controller.js # Comment controller
│   ├── image.controller.js # Image upload controller
│   ├── search.controller.js # Search controller
│   └── user.controller.js  # User management controller
│
├── models/                 # Database models
│   ├── blog.model.js       # Blog post schema
│   ├── comment.model.js    # Comment schema
│   └── user.model.js       # User schema
│
├── routes/                 # Express routes
│   ├── about.routes.js     # About page routes
│   ├── auth.routes.js      # Authentication routes
│   ├── blog.routes.js      # Blog interaction routes
│   ├── contact.routes.js   # Contact page routes
│   ├── image.routes.js     # Image upload routes
│   ├── index.routes.js     # Home page routes
│   ├── search.routes.js    # Search functionality routes
│   └── users.routes.js     # User management routes
│
├── services/               # Business logic layer
│   ├── auth.service.js     # Authentication services
│   ├── blog.service.js     # Blog post services
│   ├── comment.service.js  # Comment services
│   ├── search.service.js   # Search services
│   ├── user.service.js     # User management services
│   └── validation.service.js # Input validation services
│
├── middlewares/            # Express middlewares
│   ├── auth.middleware.js  # Authentication middleware
│   ├── authStatus.middleware.js # Auth status tracking
│   ├── errorHandler.middleware.js # Error handling
│   ├── path.middleware.js  # Path handling
│   ├── signInChecker.middleware.js # Sign-in verification
│   ├── toast.middleware.js # Flash message handling
│   ├── upload.middleware.js # File upload handling
│   └── verification.middleware.js # Email verification
│
├── utils/                  # Utility functions
│   ├── cloudinary.utils.js # Cloudinary configuration
│   ├── createToken.utils.js # JWT token creation
│   └── handleError.utils.js # Error handling utilities
│
├── helpers/                # View helpers
│   └── routes.helper.js    # Active route helper
│
├── public/                 # Static assets
│   ├── images/             # Image assets
│   ├── icons/              # Icon assets
│   ├── javascripts/        # Client-side JavaScript
│   │   ├── auth/           # Authentication scripts
│   │   ├── components/     # UI component scripts
│   │   └── blog/           # Blog interaction scripts
│   └── stylesheets/        # CSS files
│       ├── components/     # Component-specific styles
│       └── utils/          # CSS utilities
│
└── views/                  # EJS templates
    ├── layout.ejs          # Main layout template
    ├── components/         # Reusable UI components
    ├── pages/              # Page templates
    │   ├── about/          # About page
    │   ├── auth/           # Authentication pages
    │   ├── blog/           # Blog pages
    │   ├── contact/        # Contact page
    │   └── user/           # User pages
    └── partials/           # Reusable template parts
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Create a `.env` file with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   APP_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   EMAIL_USERNAME=your_email_username
   EMAIL_FROM=your_email_address
   EMAIL_PASSWORD=your_email_password
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the development server: `npm run dev` or `pnpm dev`
5. Visit `http://localhost:3000` in your browser

## Architecture

This project follows the MVC (Model-View-Controller) architecture pattern with additional service layer:

- **Models**: Define data structure and database interactions using Mongoose schemas
- **Views**: Render HTML templates using EJS templating engine
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain core business logic separated from controllers

Additional architectural layers:

- **Routes**: Define API endpoints and connect them to controllers
- **Middlewares**: Process requests before they reach route handlers
- **Utils/Helpers**: Provide utility functions and view helpers

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **View Engine**: EJS with express-ejs-layouts
- **Authentication**: JWT, bcrypt for password hashing
- **Email**: Nodemailer for email verification and password reset
- **File Upload**: Multer with Cloudinary integration
- **Session Management**: express-session with MongoDB store
- **Security**: Helmet for HTTP headers, input validation with validator.js
- **CSS**: Custom component-based CSS architecture
- **Development**: Nodemon, ESLint, Prettier

## Features in Detail

### User Authentication

- Secure sign-up and sign-in with email validation
- Email verification system for new accounts
- Password reset functionality
- Password strength validation and secure storage
- JWT-based authentication with HTTP-only cookies
- Protected routes for authenticated users

### Blog Management

- Create, read, update, and delete blog posts
- Image upload with Cloudinary integration
- User-specific blog management dashboard
- Rich content editing

### Social Features

- Like and dislike functionality for blog posts
- Comment system with user attribution
- Share count tracking
- Social media sharing capabilities

### Search System

- Full-text search across blog posts
- Search results pagination

### Responsive Design

- Mobile-first approach
- Component-based styling
- Consistent user experience across devices

## License

[MIT](LICENSE)