import mongoose from 'mongoose';

import { MONGODB_URI } from './env.js';

const dbUri = MONGODB_URI;

/**
 * Connect to MongoDB database
 * @returns {Promise} - Mongoose connection
 */

export default async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log(`Database connected ${conn.connection.host}`);

    // Add event listeners for connection issues
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected, attempting to reconnect...');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}
