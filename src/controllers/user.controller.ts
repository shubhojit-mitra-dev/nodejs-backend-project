/**
 * ----------------------
 * Note from the Developer
 * -----------------------
 *
 * Please make sure you are not using console.log statements for logging.
 * Instead, utilize the configured Winston logger available from '@/core/logger'.
 * This ensures consistent logging practices across the application.
 * The logger is set up to handle different log levels and formats based on the environment.
 *
 * @example:
 * import logger from '@/core/logger';
 * logger.info('User created successfully');
 * logger.error('Database connection failed');
 * logger.debug('Debugging info here');
 *
 * -----------------------
 *
 * Make sure to utilize the asyncHandler utility to wrap your async route handlers.
 * This helps in catching errors in async functions and passing them to the error middleware.
 * This utility is made to abstract repetitive try-catch blocks in async route handlers.
 * And maintain type safety across the application.
 *
 * Instead of this:
 * @example:
 * import { ErrorHandler } from '@/middlewares/error';
 * router.get('/users', async (req, res, next) => {
 *   try {
 *     const users = await getUsers();
 *     res.status(200).json({
 *       success: true,
 *       message: 'Users retrieved',
 *       data: users
 *     });
 *   } catch (error) {
 *     next(new ErrorHandler('Failed to get users', 500, ErrorType.DATABASE_ERROR));
 *   }
 * });
 *
 * Use this:
 * @example:
 * import { asyncHandler } from '@/utils/asyncHandler';
 * router.get('/users', asyncHandler(async () => {
 *   const users = await getUsers();
 *   return Response.success(users, 'Users retrieved');
 * }));
 *
 * This ensures any error thrown in the async function is caught and passed to the error handling middleware.
 * This keeps the code clean and consistent.
 * So that Developers don't have to manually write try-catch blocks for every async route handler.
 * This improves maintainability and readability of the codebase.
 * And enhances developer experience by reducing boilerplate code.
 */

import type { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';

export const baseAPIHandler = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: 'Hello from the User API' });
});
