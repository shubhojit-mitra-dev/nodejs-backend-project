/**
 * Error handling middleware for Express.js applications.
 *
 * This middleware captures errors thrown in the application,
 * formats them, and sends appropriate HTTP responses to the client.
 * It also differentiates between development and production environments
 * to control the verbosity of error information returned.
 *
 * In development mode, detailed error information including stack traces
 * and metadata is included in the response to aid debugging.
 * In production mode, only essential error information is sent to avoid
 * leaking sensitive details.
 */
import type { Request, Response, NextFunction } from 'express';
import type ErrorHandler from '@/utils/errorHandler';
import { ErrorType, type ErrorResponse } from '@/types/error';
import { env } from '@/env';

// Determine if the environment is development
const isDev = env.NODE_ENV === 'development';

/**
 * Express Error Handling Middleware
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Next middleware function
 * @returns - JSON response with error details
 */
export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, _next: NextFunction) => {
  // Default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Safe response for production
  /**
   * Response object sent to the client
   * @type {Object}
   * @property {boolean} success - Indicates failure
   * @property {string} message - Error message
   * @property {ErrorType} type - Type of error
   * @property {string} [stack] - Stack trace (only in development)
   * @property {Object} [metadata] - Additional error metadata (only in development)
   * @property {string} [path] - Request path (only in development)
   * @property {string} [method] - HTTP method (only in development)
   */
  const response: ErrorResponse = {
    success: false,
    message,
    type: err.errorType || ErrorType.UNKNOWN,
    ...(isDev && {
      stack: err.stack,
      metadata: err.metadata,
      path: req.originalUrl,
      method: req.method,
    }),
  };

  return res.status(statusCode).json(response);
};
