import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import helmet from 'helmet';

// Import routes
import indexRouter from './routes/index.routes.js';
import authRouter from './routes/auth.routes.js';
import usersRouter from './routes/users.routes.js';
import searchRouter from './routes/search.routes.js';
import aboutRouter from './routes/about.routes.js';
import contactRouter from './routes/contact.routes.js';
import blogRouter from './routes/blog.routes.js';
import imageRouter from './routes/image.routes.js';

// Import middlewares
import errorHandler from './middlewares/errorHandler.middleware.js';
import authStatus from './middlewares/authStatus.middleware.js';
import pathMiddleware from './middlewares/path.middleware.js';

// Import configs
import sessionConfig from './.configs/session.js';
import helmetConfig from './.configs/helmet.js';

// Import helpers
import isActiveRoute from './helpers/routes.helper.js';
import toastMiddleware from './middlewares/toast.middleware.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.locals.activeRoute = isActiveRoute;

// Session setup
app.use(session(sessionConfig));
app.use(flash());
app.use(toastMiddleware);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Middlewares
app.use(helmet(helmetConfig));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Custom middlewares
app.use(pathMiddleware);
app.use(authStatus);

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/blog', blogRouter);
app.use('/api/images', imageRouter);

// Error handler
app.use(errorHandler);

export default app;
