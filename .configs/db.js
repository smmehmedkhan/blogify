import mongoose from 'mongoose';

const dbUri = process.env.MONGODB_URI;

/**
 * Connect to MongoDB database
 * @returns {Promise} - Mongoose connection
 */
export default async function connectToDb() {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(dbUri);
    console.log(`Database connected ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}
