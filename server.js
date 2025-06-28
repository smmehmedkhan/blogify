import connectDB from './config/db.js';
import app from './app.js';
import { PORT } from './config/env.js';

const port = PORT || 3000;

/**
 * @name Server
 * @description "Try connecting to database then satrt listening server on specified port.
 * If anyting goes wrong between them console the error and exit the process."
 */
async function server() {
  try {
    await connectDB(); // Connect to database

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('An error occured on start the server:', error);
    process.exit(1);
  }
}

server();
