import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Third-party Middleware
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';

// Configs
import sessionConfig from './config/session.js';

// Middlewares
import errorHandler from './middlewares/errorHandler.middleware.js';
import authStatus from './middlewares/authStatus.middleware.js';
import pathMiddleware from './middlewares/path.middleware.js';
import { generateToken, verifyToken } from './middlewares/csrf.middleware.js';
import helmetMiddleware from './middlewares/helmet.middleware.js';

// Utilities
import nonceToken from './utils/nonce.utils.js';
import { generalApiLimiter } from './utils/rateLimit.utils.js';
import detectActiveRoute from './utils/activeRouteDetector.utils.js';

// Routes
import indexRouter from './routes/index.routes.js';
import authRouter from './routes/auth.routes.js';
import usersRouter from './routes/users.routes.js';
import searchRouter from './routes/search.routes.js';
import aboutRouter from './routes/about.routes.js';
import contactRouter from './routes/contact.routes.js';
import blogRouter from './routes/blog.routes.js';
import mediaRouter from './routes/media.routes.js';
import tagRoutes from './routes/tag.routes.js';
import exploreRouter from './routes/explore.routes.js';
import subscribeRouter from './routes/subscribe.routes.js';
import toastRouter from './routes/toast.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global helpers
app.locals.activeRoute = detectActiveRoute;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// Logger
app.use(logger('dev'));

// Sessions & Flash
app.use(session(sessionConfig));
app.use(flash());

// Security
app.use(nonceToken); // CSP nonce
app.use(helmetMiddleware); // Helmet
app.use(generalApiLimiter); // General API rate limiter

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Custom middlewares
app.use(pathMiddleware);
app.use(authStatus);
app.use(generateToken); // CSRF token generator

// Public routes
app.use('/', indexRouter);
app.use('/api', toastRouter);
app.use('/explore', exploreRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/subscribe', subscribeRouter);
app.use('/auth', authRouter);

// Private routes
app.use('/users', usersRouter);
app.use('/search', verifyToken, searchRouter);
app.use('/blog', verifyToken, blogRouter);
app.use('/api/media', mediaRouter);
app.use('/api/tags', tagRoutes);

// Error handler
app.use(errorHandler);

export default app;
