# Blogify

🚀 **Blogify** is a feature-rich blogging platform that empowers writers and content creators to share their stories with the world. Built with modern web technologies and following industry best practices, Blogify offers a seamless writing experience with powerful content management capabilities.

✨ **Why Blogify?**

- **Professional Grade**: Enterprise-level security, performance optimization, and scalability
- **Writer-Focused**: Intuitive interface with Markdown editing, live preview, and seamless media management
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

- **Markdown Editor**: EasyMDE with live preview, syntax highlighting, and drag & drop support
- **Multi-Media Support**: Images, videos, and audio files with Cloudinary integration
- **Tag System**: Dynamic tagging with autocomplete and tag management
- **Draft System**: Auto-save drafts with localStorage backup
- **Content Sanitization**: HTML sanitization to prevent XSS attacks
- **SEO Optimization**: Meta tags, slugs, and search engine friendly URLs

### 📧 Newsletter & Subscription

- **Email Subscription**: Newsletter signup with validation
- **Welcome Emails**: Automated SendGrid email templates
- **Subscriber Management**: Backend subscriber database
- **Email Templates**: Responsive HTML email design

### 🔍 Enhanced Content Discovery

- **Explore Page**: Dedicated content discovery with advanced filtering
- **Multi-criteria Search**: Filter by tags, date, popularity, and keywords
- **Dynamic Pagination**: Efficient content browsing
- **Tag-based Discovery**: Browse content by categories

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

```text
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
├── Dockerfile              # Docker containerization
├── ci-cd.yml               # CI/CD pipeline configuration
└── .dockerignore           # Docker ignore rules
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
│   ├── explore.controller.js # Content discovery controller
│   ├── image.controller.js # Image upload controller
│   ├── search.controller.js # Search functionality controller
│   ├── subscribe.controller.js # Newsletter subscription controller
│   ├── tag.controller.js   # Tag management controller
│   └── user.controller.js  # User management controller
│
├── models/                 # Database models (Mongoose schemas)
│   ├── blog.model.js       # Blog post schema
│   ├── comment.model.js    # Comment schema
│   ├── contact.model.js    # Contact message schema
│   ├── subscriber.model.js # Newsletter subscriber schema
│   ├── tag.model.js        # Tag schema
│   └── user.model.js       # User schema
│
├── routes/                 # Express route definitions
│   ├── about.routes.js     # About page routes
│   ├── auth.routes.js      # Authentication routes
│   ├── blog.routes.js      # Blog interaction routes
│   ├── contact.routes.js   # Contact page routes
│   ├── explore.routes.js   # Content discovery routes
│   ├── image.routes.js     # Image upload API routes
│   ├── index.routes.js     # Home page routes
│   ├── media.routes.js     # Media upload API routes
│   ├── search.routes.js    # Search functionality routes
│   ├── subscribe.routes.js  # Newsletter subscription routes
│   ├── tag.routes.js       # Tag API routes
│   ├── toast.routes.js     # Toast notification API
│   └── users.routes.js     # User management routes
│
├── services/               # Business logic layer
│   ├── auth.service.js     # Authentication services
│   ├── blog.service.js     # Blog post services
│   ├── comment.service.js  # Comment services
│   ├── contact.service.js  # Contact form services
│   ├── search.service.js   # Search services
│   ├── subscribe.service.js # Newsletter and email services
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
│   ├── sessionManager.middleware.js # Session management middleware
│   ├── signInChecker.middleware.js # Sign-in verification
│   ├── toast.middleware.js # Flash message handling
│   └── upload.middleware.js # File upload handling
│
├── utils/                  # Utility functions
│   ├── cloudinary.utils.js # Cloudinary configuration
│   ├── createToken.utils.js # JWT token creation
│   ├── handleError.utils.js # Error handling utilities
│   ├── logger.js           # Winston logger configuration
│   ├── nonce.utils.js      # CSP nonce generation
│   └── rateLimit.utils.js  # Rate limiting utilities
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
│   │   │   ├── blogInteractions.js # Like/dislike functionality
│   │   │   ├── comments.js # Comment system
│   │   │   ├── deletePost.js # Post deletion
│   │   │   ├── easyMDEConfig.js # EasyMDE configuration
│   │   │   ├── exploreInteractions.js # Explore page interactions
│   │   │   ├── followHandler.js # User follow system
│   │   │   ├── imagePreview.js # Image preview functionality
│   │   │   ├── masonry.js  # Masonry layout
│   │   │   ├── searchHandler.js # Search functionality
│   │   │   ├── stats-counter.js # Statistics counter
│   │   │   ├── tagify.js    # Tag input component
│   │   │   ├── testimonial-slider.js # Testimonial carousel
│   │   │   └── toastHandler.js # Toast notifications
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
│       │   ├── easymde-theme.css # EasyMDE custom theme
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
    │   ├── blog-card.ejs   # Reusable blog card component
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
    │   ├── explore.ejs     # Content discovery page
    │   └── index.ejs       # Home page
    └── partials/           # Reusable template parts
        ├── banner.ejs      # Page banner partial
        ├── call-to-action.ejs # CTA component
        ├── dash-banner.ejs # Dashboard banner partial
        ├── footer.ejs      # Footer partial
        ├── hero-image.ejs  # Hero section partial
        ├── latest-blogs.ejs # Latest blogs partial
        ├── navbar.ejs      # Navigation partial
        ├── partners.ejs    # Partner logos
        ├── platform-features.ejs # Feature highlights
        ├── platform-stats.ejs # Statistics display
        ├── search-results.ejs # Search results partial
        └── testimonials.ejs # User testimonials
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Create a `.env` file with the required variables:

   ```env
   NODE_ENV=development
   PORT=3000
   APP_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   EMAIL_USERNAME=your_email_username
   EMAIL_FROM=your_email_address
   EMAIL_PASSWORD=your_email_password
   SENDGRID_API_KEY=your_sendgrid_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the development server: `npm run dev` or `pnpm dev`
5. Visit `http://localhost:3000` in your browser

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

- **EasyMDE**: Advanced Markdown editor with live preview
- **Markdown-it**: Markdown parsing and rendering
- **Turndown**: HTML to Markdown conversion
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

## API Endpoints

### Media Upload

- `POST /api/media/upload` - Upload images, videos, or audio files

### Newsletter

- `POST /subscribe` - Subscribe to newsletter

### Toast Notifications

- `GET /api/toast` - Get flash messages

### Content Discovery

- `GET /explore` - Browse and filter blog posts with advanced options

## Docker Deployment

```bash
# Build the Docker image
docker build -t blogify .

# Run the container
docker run -p 3000:3000 --env-file .env blogify
```

## License

[MIT](LICENSE)
