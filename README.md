# Blogify

🚀 **Blogify** is a feature-rich, production-ready blogging platform that empowers writers and content creators to share their stories with the world. Built with modern web technologies and following industry best practices, Blogify offers a seamless writing experience with powerful content management capabilities.

✨ **Why Blogify?**

- **Professional Grade**: Enterprise-level security, performance optimization, and scalability
- **Writer-Focused**: Intuitive interface with rich text editing, live preview, and seamless image management
- **Community-Driven**: Built-in social features including comments, likes, follows, and content discovery
- **Developer-Friendly**: Clean MVC architecture, comprehensive API, and extensive customization options
- **SEO Optimized**: Built-in SEO features, meta tags, and search engine friendly URLs

## Features

### 🔐 Authentication & Security

- **Multi-layer Authentication**: JWT tokens with HTTP-only cookies and session management
- **Email Verification**: Secure account activation with email confirmation
- **Password Security**: bcrypt hashing with strength validation and secure reset functionality
- **CSRF Protection**: Token-based CSRF protection for all forms and API calls
- **Rate Limiting**: Login attempt limiting and API rate limiting
- **Security Headers**: Helmet.js integration with CSP, HSTS, and other security headers
- **Input Validation**: Comprehensive server-side validation and sanitization

### 📝 Content Management

- **Rich Text Editor**: TinyMCE integration with live preview and formatting options
- **Image Management**: Cloudinary integration for optimized image upload and storage
- **Tag System**: Dynamic tagging with autocomplete and tag management
- **Draft System**: Save drafts and publish when ready
- **Content Sanitization**: HTML sanitization to prevent XSS attacks
- **SEO Optimization**: Meta tags, slugs, and search engine friendly URLs

### 👥 User Experience

- **User Profiles**: Customizable profiles with bio, social links, and profile pictures
- **Dashboard**: Personal content management dashboard
- **Follow System**: Follow/unfollow users and discover new content
- **Social Interactions**: Like, dislike, comment, and share functionality
- **Search & Discovery**: Full-text search with advanced filtering
- **Responsive Design**: Mobile-first design with dark/light theme support

### 🛠 Technical Features

- **MVC Architecture**: Clean separation of concerns with service layer
- **Database**: MongoDB with Mongoose ODM and optimized queries
- **Session Management**: MongoDB session store with express-session
- **Error Handling**: Comprehensive error logging with Winston
- **Flash Messages**: Toast notifications for user feedback
- **Contact System**: Contact form with admin notification system
- **Environment Management**: Multi-environment configuration support

## Project Structure

```
blogify/
├── app.js                  # Application configuration and middleware setup
├── server.js               # Server entry point and database connection
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables (development)
├── .env.production         # Production environment variables
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── eslint.config.js        # ESLint configuration
├── pnpm-lock.yaml          # PNPM lock file
├── pnpm-workspace.yaml     # PNPM workspace configuration
├── DEVLOG.md               # Development log
├── ROADMAP.md              # Project roadmap
├── combined.log            # Application logs
├── error.log               # Error logs
│
├── config/                 # Configuration files
│   ├── db.js               # MongoDB database configuration
│   ├── env.js              # Environment variables export
│   └── session.js          # Express session configuration
│
├── controllers/            # Request handlers (MVC Controllers)
│   ├── auth.controller.js  # Authentication controller
│   ├── blog.controller.js  # Blog post management controller
│   ├── comment.controller.js # Comment system controller
│   ├── contact.controller.js # Contact form controller
│   ├── image.controller.js # Image upload controller
│   ├── search.controller.js # Search functionality controller
│   ├── tag.controller.js   # Tag management controller
│   └── user.controller.js  # User management controller
│
├── models/                 # Database models (Mongoose schemas)
│   ├── blog.model.js       # Blog post schema
│   ├── comment.model.js    # Comment schema
│   ├── contact.model.js    # Contact message schema
│   ├── tag.model.js        # Tag schema
│   └── user.model.js       # User schema
│
├── routes/                 # Express route definitions
│   ├── about.routes.js     # About page routes
│   ├── auth.routes.js      # Authentication routes
│   ├── blog.routes.js      # Blog interaction routes
│   ├── contact.routes.js   # Contact page routes
│   ├── image.routes.js     # Image upload API routes
│   ├── index.routes.js     # Home page routes
│   ├── search.routes.js    # Search functionality routes
│   ├── tag.routes.js       # Tag API routes
│   └── users.routes.js     # User management routes
│
├── services/               # Business logic layer
│   ├── auth.service.js     # Authentication services
│   ├── blog.service.js     # Blog post services
│   ├── comment.service.js  # Comment services
│   ├── contact.service.js  # Contact form services
│   ├── search.service.js   # Search services
│   ├── tag.service.js      # Tag management services
│   ├── user.service.js     # User management services
│   └── validation.service.js # Input validation services
│
├── middlewares/            # Express middlewares
│   ├── auth.middleware.js  # Authentication middleware
│   ├── authStatus.middleware.js # Auth status tracking
│   ├── csrf.middleware.js  # CSRF protection middleware
│   ├── emailVerification.middleware.js # Email verification middleware
│   ├── errorHandler.middleware.js # Global error handling
│   ├── errorLogger.middleware.js # Error logging middleware
│   ├── helmet.middleware.js # Security headers middleware
│   ├── path.middleware.js  # Path handling middleware
│   ├── signInChecker.middleware.js # Sign-in verification
│   ├── toast.middleware.js # Flash message handling
│   └── upload.middleware.js # File upload handling
│
├── utils/                  # Utility functions
│   ├── cloudinary.utils.js # Cloudinary configuration
│   ├── createToken.utils.js # JWT token creation
│   ├── handleError.utils.js # Error handling utilities
│   ├── logger.js           # Winston logger configuration
│   ├── loginLimiter.utils.js # Rate limiting for login attempts
│   └── nonce.utils.js      # CSP nonce generation
│
├── helpers/                # View helpers
│   └── routes.helper.js    # Active route helper for navigation
│
├── public/                 # Static assets
│   ├── favicon.ico         # Website favicon
│   ├── site.webmanifest    # Web app manifest
│   ├── images/             # Image assets
│   │   ├── android-chrome-*.png # PWA icons
│   │   ├── apple-touch-icon.png # iOS icon
│   │   ├── blogify-logo-*.png # Brand logos
│   │   ├── favicon-*.png   # Favicon variants
│   │   ├── hero-image.webp # Hero section image
│   │   ├── noise.png       # Background texture
│   │   ├── user.png        # Default user avatar
│   │   └── social media icons
│   ├── icons/              # SVG icons
│   │   ├── error.svg       # Error icon
│   │   ├── info.svg        # Info icon
│   │   ├── success.svg     # Success icon
│   │   ├── warning.svg     # Warning icon
│   │   ├── moon.svg        # Dark theme icon
│   │   ├── sun.svg         # Light theme icon
│   │   └── image.svg       # Image placeholder
│   ├── javascripts/        # Client-side JavaScript
│   │   ├── admin/          # Admin panel scripts
│   │   │   └── statusUpdater.js # Status update functionality
│   │   ├── auth/           # Authentication scripts
│   │   │   ├── signInValidator.js # Sign-in form validation
│   │   │   ├── signUpValidator.js # Sign-up form validation
│   │   │   └── verification.js # Email verification handling
│   │   ├── components/     # UI component scripts
│   │   │   ├── addPostLivePreview.js # Live preview for new posts
│   │   │   ├── addPostTagify.js # Tag input for new posts
│   │   │   ├── addPostTinymceConfig.js # TinyMCE config for new posts
│   │   │   ├── blogInteractions.js # Like/dislike functionality
│   │   │   ├── comments.js # Comment system
│   │   │   ├── deletePost.js # Post deletion
│   │   │   ├── editPost*.js # Post editing functionality
│   │   │   ├── followHandler.js # User follow system
│   │   │   ├── profileImgLivePreview.js # Profile image preview
│   │   │   ├── searchHandler.js # Search functionality
│   │   │   └── tinymceLoader.js # TinyMCE initialization
│   │   └── navigation/     # Navigation scripts
│   │       ├── navbarDisappear.js # Auto-hide navbar
│   │       ├── theme.js    # Dark/light theme toggle
│   │       └── toggleButton.js # Mobile menu toggle
│   └── stylesheets/        # CSS files
│       ├── global.css      # Global styles
│       ├── styles.css      # Main stylesheet
│       ├── components/     # Component-specific styles
│       │   ├── about.css   # About page styles
│       │   ├── auth-components.css # Authentication styles
│       │   ├── back-btn.css # Back button styles
│       │   ├── banner.css  # Banner component styles
│       │   ├── blog.css    # Blog post styles
│       │   ├── comments.css # Comment system styles
│       │   ├── contact.css # Contact page styles
│       │   ├── dash-banner.css # Dashboard banner styles
│       │   ├── dashboard.css # Dashboard styles
│       │   ├── edit-profile.css # Profile editing styles
│       │   ├── empty-post.css # Empty state styles
│       │   ├── footer.css  # Footer styles
│       │   ├── hero-image.css # Hero section styles
│       │   ├── latest-blogs.css # Blog listing styles
│       │   ├── logo.css    # Logo styles
│       │   ├── navbar.css  # Navigation styles
│       │   ├── pagination.css # Pagination styles
│       │   ├── posts-page.css # Posts page styles
│       │   ├── search.css  # Search component styles
│       │   └── user-profile.css # User profile styles
│       └── utils/          # CSS utilities
│           └── variables.css # CSS custom properties
│
└── views/                  # EJS templates (MVC Views)
    ├── layout.ejs          # Main layout template
    ├── components/         # Reusable UI components
    │   ├── auth-buttons.ejs # Authentication buttons
    │   ├── back-btn.ejs    # Back button component
    │   ├── brand-logo.ejs  # Brand logo component
    │   ├── comments.ejs    # Comments component
    │   ├── empty-post.ejs  # Empty state component
    │   ├── pagination.ejs  # Pagination component
    │   ├── search.ejs      # Search component
    │   └── toast.ejs       # Toast notification component
    ├── pages/              # Page templates
    │   ├── auth/           # Authentication pages
    │   │   ├── forgot-password.ejs # Password reset request
    │   │   ├── reset-password.ejs # Password reset form
    │   │   ├── sign-in.ejs # Sign-in page
    │   │   ├── sign-up.ejs # Sign-up page
    │   │   └── verification.ejs # Email verification page
    │   ├── user/           # User-related pages
    │   │   ├── add-post.ejs # Create new post
    │   │   ├── dashboard.ejs # User dashboard
    │   │   ├── edit-post.ejs # Edit existing post
    │   │   ├── edit-profile.ejs # Edit user profile
    │   │   ├── profile-preview.ejs # Profile preview
    │   │   └── profile.ejs # User profile page
    │   ├── about.ejs       # About page
    │   ├── blog.ejs        # Individual blog post page
    │   ├── contact.ejs     # Contact page
    │   ├── error.ejs       # Error page template
    │   └── index.ejs       # Home page
    └── partials/           # Reusable template parts
        ├── banner.ejs      # Page banner partial
        ├── dash-banner.ejs # Dashboard banner partial
        ├── footer.ejs      # Footer partial
        ├── hero-image.ejs  # Hero section partial
        ├── latest-blogs.ejs # Latest blogs partial
        ├── navbar.ejs      # Navigation partial
        └── search-results.ejs # Search results partial
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

Blogify follows a **layered MVC architecture** with additional service and middleware layers for better separation of concerns and maintainability.

### Core Architecture Layers

#### 🎯 **Models (Data Layer)**

- **Mongoose Schemas**: Define data structure and validation rules
- **Database Interactions**: Handle CRUD operations and complex queries
- **Data Relationships**: Manage references between users, blogs, comments, and tags
- **Indexing**: Optimized database indexes for search and performance

#### 🎨 **Views (Presentation Layer)**

- **EJS Templates**: Server-side rendering with dynamic content
- **Layout System**: Consistent page structure with express-ejs-layouts
- **Component Architecture**: Reusable UI components and partials
- **Responsive Design**: Mobile-first CSS with theme support

#### 🎮 **Controllers (Request Layer)**

- **Request Handling**: Process HTTP requests and coordinate responses
- **Input Validation**: Validate and sanitize user input
- **Error Handling**: Graceful error management and user feedback
- **Response Formatting**: Structure data for views and API responses

#### ⚙️ **Services (Business Logic Layer)**

- **Core Business Logic**: Isolated business rules and operations
- **Data Processing**: Complex data manipulation and calculations
- **External Integrations**: Third-party service interactions (Cloudinary, SendGrid)
- **Reusable Functions**: Shared functionality across controllers

### Supporting Architecture Layers

#### 🛣️ **Routes (Routing Layer)**

- **Endpoint Definition**: RESTful API and web route definitions
- **Middleware Integration**: Route-specific middleware application
- **Parameter Handling**: URL parameters and query string processing
- **Route Protection**: Authentication and authorization guards

#### 🔧 **Middlewares (Processing Layer)**

- **Authentication**: JWT token validation and user session management
- **Security**: CSRF protection, rate limiting, and security headers
- **Logging**: Request/response logging and error tracking
- **Data Processing**: File uploads, input parsing, and validation

#### 🛠️ **Utils & Helpers (Utility Layer)**

- **Common Functions**: Shared utility functions and helpers
- **Configuration**: Environment and application configuration
- **External Services**: API clients and service integrations
- **View Helpers**: Template helper functions for dynamic content

### Design Patterns

- **Dependency Injection**: Service layer dependency management
- **Factory Pattern**: Database connection and configuration factories
- **Middleware Pattern**: Request/response processing pipeline
- **Observer Pattern**: Event-driven architecture for notifications
- **Repository Pattern**: Data access abstraction through services

### Security Architecture

- **Multi-layer Security**: Authentication, authorization, and input validation
- **CSRF Protection**: Token-based cross-site request forgery prevention
- **Rate Limiting**: API and login attempt protection
- **Content Security Policy**: XSS prevention with CSP headers
- **Session Security**: Secure session management with MongoDB store

## Technologies Used

### Backend Framework

- **Node.js**: JavaScript runtime environment
- **Express.js 5.x**: Web application framework with modern features
- **ES6 Modules**: Modern JavaScript module system

### Database & ODM

- **MongoDB**: NoSQL document database
- **Mongoose**: Object Document Mapping (ODM) library
- **Connect-Mongo**: MongoDB session store

### Authentication & Security

- **JWT (jsonwebtoken)**: Token-based authentication
- **bcrypt**: Password hashing and salting
- **Helmet**: Security headers middleware
- **express-rate-limit**: Rate limiting for API protection
- **CSRF Protection**: Custom CSRF token implementation
- **Input Validation**: validator.js and sanitize-html

### View Engine & Templating

- **EJS**: Embedded JavaScript templating
- **express-ejs-layouts**: Layout support for EJS
- **Method Override**: HTTP verb support (PUT, DELETE)

### File Upload & Storage

- **Multer**: Multipart form data handling
- **Cloudinary**: Cloud-based image storage and optimization
- **multer-storage-cloudinary**: Cloudinary storage engine

### Email Services

- **Nodemailer**: Email sending functionality
- **SendGrid**: Email delivery service integration

### Session & State Management

- **express-session**: Session middleware
- **connect-flash**: Flash message middleware
- **cookie-parser**: Cookie parsing middleware

### Logging & Monitoring

- **Winston**: Comprehensive logging library
- **Morgan**: HTTP request logger middleware

### Content Processing

- **TinyMCE**: Rich text editor integration
- **sanitize-html**: HTML sanitization
- **striptags**: HTML tag removal
- **slugify**: URL-friendly string generation

### Development Tools

- **Nodemon**: Development server with auto-restart
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **PNPM**: Fast, disk space efficient package manager

### Frontend Technologies

- **Vanilla JavaScript**: Client-side interactivity
- **CSS3**: Modern styling with custom properties
- **Responsive Design**: Mobile-first approach
- **Progressive Web App**: PWA features with manifest

### Additional Libraries

- **Toastify.js**: Toast notifications
- **Tagify**: Tag input component
- **Debug**: Debugging utility

## Features in Detail

### 🔐 Authentication & User Management

**Secure Authentication System**

- Multi-factor authentication with email verification
- JWT tokens with HTTP-only cookies for enhanced security
- bcrypt password hashing with salt rounds
- Rate-limited login attempts to prevent brute force attacks
- Secure password reset with time-limited tokens
- Session management with MongoDB store

**User Profiles & Management**

- Customizable user profiles with bio and social links
- Profile picture upload with Cloudinary optimization
- User dashboard for content and account management
- Follow/unfollow system for user connections
- Account verification status and email management

### 📝 Content Creation & Management

**Rich Text Editor**

- TinyMCE integration with custom toolbar
- Live preview functionality during content creation
- HTML sanitization to prevent XSS attacks
- Auto-save drafts to prevent content loss
- Image insertion with drag-and-drop support

**Advanced Blog Features**

- Dynamic tagging system with autocomplete
- SEO-friendly URLs with automatic slug generation
- Meta description and keyword management
- Content categorization and organization
- Scheduled publishing capabilities
- Blog post analytics and view tracking

**Media Management**

- Cloudinary integration for optimized image storage
- Automatic image compression and format optimization
- Multiple image format support (JPEG, PNG, WebP)
- Image transformation and resizing
- CDN delivery for fast global access

### 👥 Social & Community Features

**Interaction System**

- Like and dislike functionality with real-time updates
- Comprehensive commenting system with nested replies
- Comment moderation and management tools
- Social sharing with platform-specific optimization
- Share count tracking and analytics

**Discovery & Engagement**

- Advanced search with full-text indexing
- Tag-based content discovery
- User-based content recommendations
- Trending posts and popular content
- Recent activity feeds

### 🔍 Search & Navigation

**Powerful Search Engine**

- Full-text search across all blog content
- Advanced filtering by tags, authors, and dates
- Search result highlighting and relevance scoring
- Pagination with infinite scroll option
- Search analytics and popular queries

**Navigation & UX**

- Responsive navigation with mobile-first design
- Breadcrumb navigation for better user orientation
- Auto-hiding navbar for immersive reading
- Dark/light theme toggle with system preference detection
- Keyboard shortcuts for power users

### 🛡️ Security & Performance

**Security Measures**

- CSRF protection with token validation
- Content Security Policy (CSP) headers
- Rate limiting for API endpoints
- Input validation and sanitization
- SQL injection prevention through ODM
- XSS protection with HTML sanitization

**Performance Optimization**

- Database query optimization with indexing
- Image lazy loading and optimization
- CSS and JavaScript minification
- Gzip compression for faster loading
- CDN integration for static assets
- Caching strategies for improved performance

### 📊 Analytics & Monitoring

**Comprehensive Logging**

- Winston-based logging system
- Error tracking and monitoring
- User activity logging
- Performance metrics collection
- Security event logging

**Admin Features**

- Contact form management system
- User management and moderation tools
- Content moderation capabilities
- System health monitoring
- Analytics dashboard for insights

## License

[MIT](LICENSE)
