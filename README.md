# Blogify


A modern blogging platform built with Node.js, Express, and MongoDB.

## Features

| Feature                  | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| User Authentication      | Sign-up and sign-in functionality with secure password handling using bcrypt |
| User Management          | User profiles and account management                                         |
| Blog Creation            | Users can create, edit, and delete their blog posts                          |
| Blog Interaction         | Like, dislike, and share functionality for blog posts                        |
| Commenting System        | Users can add and delete comments on blog posts                              |
| Search Functionality     | Search capability to find specific blog posts                                |
| User Dashboard           | Personal dashboard for users to manage their content                         |
| Responsive Design        | CSS components for various screen sizes                                      |
| Security Features        | Helmet for HTTP security headers, strong password validation                 |
| Session Management       | User sessions with express-session and MongoDB storage                       |
| Error Handling           | Custom error handling middleware                                             |
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
├── configs/                # Configuration files
│   ├── db.js               # Database configuration
│   ├── session.js          # Session configuration
│   └── helmet.js           # Helmet security configuration
│
├── controllers/            # Request handlers
│   ├── auth.controller.js  # Authentication controller
│   ├── blog.controller.js  # Blog post controller
│   ├── comment.controller.js # Comment controller
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
│   ├── index.routes.js     # Home page routes
│   ├── search.routes.js    # Search functionality routes
│   └── users.routes.js     # User management routes
│
├── services/               # Business logic layer
│   ├── auth.service.js     # Authentication services
│   ├── blog.service.js     # Blog post services
│   ├── comment.service.js  # Comment services
│   ├── search.service.js   # Search services
│   └── user.service.js     # User management services
│
├── middlewares/            # Express middlewares
│   ├── auth.middleware.js  # Authentication middleware
│   ├── authStatus.middleware.js # Auth status tracking
│   ├── errorHandler.middleware.js # Error handling
│   ├── path.middleware.js  # Path handling
│   └── signInChecker.middleware.js # Sign-in verification
│
├── utils/                  # Utility functions
│   ├── createToken.utils.js # JWT token creation
│   └── handleError.utils.js # Error handling utilities
│
├── helpers/                # View helpers
│   └── routes.helper.js    # Active route helper
│
├── public/                 # Static assets
│   ├── images/             # Image assets
│   ├── javascripts/        # Client-side JavaScript
│   │   ├── blog-interactions.js # Blog interaction handlers
│   │   ├── navbarDisappear.js # Navbar behavior
│   │   ├── scripts.js      # General scripts
│   │   └── toggleButton.js # UI toggle functionality
│   └── stylesheets/        # CSS files
│       ├── components/     # Component-specific styles
│       │   ├── navbar.css  # Navigation styling
│       │   ├── blog.css    # Blog post styling
│       │   ├── footer.css  # Footer styling
│       │   └── ...         # Other component styles
│       ├── utils/          # CSS utilities
│       ├── global.css      # Global styles
│       └── styles.css      # Main stylesheet
│
└── views/                  # EJS templates
    ├── layout.ejs          # Main layout template
    ├── pages/              # Page templates
    │   ├── about.ejs       # About page
    │   ├── contact.ejs     # Contact page
    │   ├── error.ejs       # Error page
    │   ├── index.ejs       # Home page
    │   ├── auth/           # Authentication pages
    │   │   ├── sign-in.ejs # Sign in page
    │   │   └── sign-up.ejs # Sign up page
    │   └── user/           # User pages
    │       ├── dashboard.ejs # User dashboard
    │       ├── add-post.ejs # Add blog post
    │       └── edit-post.ejs # Edit blog post
    └── partials/           # Reusable components
        ├── navbar.ejs      # Navigation bar
        ├── footer.ejs      # Footer
        ├── blog.ejs        # Blog post template
        ├── search.ejs      # Search component
        └── ...             # Other components
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server: `npm run dev`
5. Visit `http://localhost:3000` in your browser

## Architecture

This project follows the MVC (Model-View-Controller) architecture pattern:

- **Models**: Define data structure and database interactions using Mongoose schemas
- **Views**: Render HTML templates using EJS templating engine
- **Controllers**: Handle HTTP requests and responses, implementing business logic

Additional architectural layers:

- **Routes**: Define API endpoints and connect them to controllers
- **Services**: Contain core business logic separated from controllers
- **Middlewares**: Process requests before they reach route handlers
- **Utils/Helpers**: Provide utility functions and view helpers

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **View Engine**: EJS with express-ejs-layouts
- **Authentication**: JWT, bcrypt for password hashing
- **Session Management**: express-session with MongoDB store
- **Security**: Helmet for HTTP headers, input validation
- **CSS**: Custom component-based CSS architecture
- **Development**: Nodemon, ESLint, Prettier

## Features in Detail

### User Authentication

- Secure sign-up and sign-in with email validation
- Password strength validation and secure storage
- JWT-based authentication
- Protected routes for authenticated users

### Blog Management

- Create, read, update, and delete blog posts
- Rich text editing for blog content
- User-specific blog management dashboard

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
