import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Export environment variables
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const APP_URL = process.env.APP_URL;
export const MONGODB_URI = process.env.MONGODB_URI;

export const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
export const EMAIL_FROM = process.env.EMAIL_FROM;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'APP_URL',
  'MONGODB_URI',
  'JWT_SECRET',
  'SESSION_SECRET',
  'SENDGRID_API_KEY',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Environment variable ${envVar} is missing`);
    process.exit(1);
  }
}
