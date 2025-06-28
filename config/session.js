import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import { NODE_ENV } from './env.js';

dotenv.config();

const options = {
  sessionSecret: process.env.SESSION_SECRET,
  dbUrl: process.env.MONGODB_URI,
  cookiesAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

/**
 * Session configuration
 */
const sessionConfig = {
  secret: options.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: options.dbUrl,
    touchAfter: 24 * 3600, // Only update session once per day
  }),
  cookie: {
    maxAge: options.cookiesAge,
    httpOnly: true,
    secure: NODE_ENV === 'production', // Only use secure in production
    sameSite: 'strict',
  },
};

export default sessionConfig;
