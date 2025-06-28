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
import toastMiddleware from './middlewares/toast.middleware.js';
import { generateToken, verifyToken } from './middlewares/csrf.middleware.js';

// Helpers
import isActiveRoute from './helpers/routes.helper.js';

// Utilities
import nonceToken from './utils/nonce.utils.js';

// Routes
import indexRouter from './routes/index.routes.js';
import authRouter from './routes/auth.routes.js';
import usersRouter from './routes/users.routes.js';
import searchRouter from './routes/search.routes.js';
import aboutRouter from './routes/about.routes.js';
import contactRouter from './routes/contact.routes.js';
import blogRouter from './routes/blog.routes.js';
import imageRouter from './routes/image.routes.js';
import helmetMiddleware from './middlewares/helmet.middleware.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global helpers
app.locals.activeRoute = isActiveRoute;

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
app.use(helmetMiddleware); // helmet

// Toast notifications
app.use(toastMiddleware);

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
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/auth', verifyToken, authRouter);

// Private routes
app.use('/users', usersRouter);
app.use('/search', verifyToken, searchRouter);
app.use('/blog', verifyToken, blogRouter);
app.use('/api/images', imageRouter);

// Error handler
app.use(errorHandler);

export default app;
