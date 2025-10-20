/**
 * Entry point for the Express server application.
 *
 * This file initializes the server, connects to the database,
 * and sets up global error handling for uncaught exceptions
 * and unhandled promise rejections.
 *
 * It ensures that the application environment is validated
 * before starting the server and provides informative logging
 * for startup success or failure.
 */
import { env } from '@/env';
import app from '@/server/server';
import { initDb } from '@/db';
import ErrorHandler from '@/utils/errorHandler';

/**
 * Handle uncaught synchronous exceptions
 * These are fatal errors that would crash the app
 */
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1); // Exit immediately for safety
});

/**
 * Handle unhandled promise rejections
 * Covers async failures not caught in try/catch
 */
process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

/**
 * Main server startup function
 * - Validates env
 * - Initializes DB connection
 * - Starts the Express server
 * - Applies global error handling
 */
async function startServer() {
  try {
    await initDb(); // Throws if DB connection fails

    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT} [${env.NODE_ENV}]`);
    });
  } catch (error: unknown) {
    /**
     * Wrap any startup error in ErrorHandler.DatabaseError for consistency
     * Includes metadata like stack for debugging
     */
    const startupError =
      error instanceof ErrorHandler
        ? error
        : ErrorHandler.DatabaseError((error as Error).message || 'Failed to start server', {
          stack: (error as Error).stack,
        });

    console.error('Startup Error:', startupError.message);
    console.error(startupError.metadata);
    process.exit(1);
  }
}

startServer();
