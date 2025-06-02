import app from './app.js';
import connectDB from './.configs/db.js';
import { PORT } from './.configs/env.js';

const port = PORT || 3000;

/**
 * @name Server
 * @description "Try connecting to database then satrt listening server on specified port.
 * If anyting goes wrong between them console the error and exit server"
 */
async function startServer() {
  try {
    await connectDB(); // Connect to database
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer();
