import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';

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
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: options.dbUrl,
  }),
  cookie: {
    maxAge: options.cookiesAge,
  },
};

export default sessionConfig;
