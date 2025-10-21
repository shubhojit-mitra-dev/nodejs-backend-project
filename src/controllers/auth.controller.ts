/**
 * Authentication Controller
 *
 * Handles user signup and login functionalities.
 * Utilizes asyncHandler for error handling and response formatting.
 * Implements input validation using Zod schemas.
 * Interacts with the database using Drizzle ORM.
 *
 * Design Pattern Used:
 *  - Controller Pattern: Encapsulates auth logic in a dedicated controller.
 *  - Middleware Pattern: Uses asyncHandler for cleaner async route handling.
 *  - Validation Pattern: Centralized input validation with Zod schemas.
 *
 * @module controllers/auth.controller
 * @requires express
 * @requires drizzle-orm
 * @requires @/db
 * @requires @/db/schemas
 * @requires @/utils/asyncHandler
 * @requires @/utils/errorHandler
 * @requires @/utils/validations
 * @requires @/utils/hashing
 * @exports signupHandler - Handler for user signup
 * @exports loginHandler - Handler for user login
 *
 */

import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schemas';
import { asyncHandler, Response, validate } from '@/utils/asyncHandler';
import ErrorHandler from '@/utils/errorHandler';
import { SignupSchema } from '@/utils/validations';
import { comparePasswords, hashPassword } from '@/utils/helpers';
import { generateJWTandSetCookie } from '@/utils/jwt_session';

/**
 * Signup Handler
 * - Validates input
 * - Checks for existing username/email
 * - Hashes password
 * - Creates new user in DB
 * - Returns created user details (excluding password)
 *
 * Utilizes asyncHandler for automatic error handling and response formatting.
 * Input is validated using the SignupSchema.
 * Interacts with the database via Drizzle ORM.
 * @returns Created user details without password
 * @throws ConflictError if username or email already exists
 * @throws InternalServerError for any other failures
 * @exports signupHandler
 */
export const signupHandler = asyncHandler(async (req: ExpressRequest, _res: ExpressResponse) => {
  const { username, email, password } = req.body;

  const existingEmail = await db.select().from(users).where(eq(users.email, email));
  if (existingEmail.length) {
    throw ErrorHandler.Conflict('Email already in use');
  }

  const existingUsername = await db.select().from(users).where(eq(users.username, username));
  if (existingUsername.length) {
    throw ErrorHandler.Conflict('Username already in use');
  }

  const hashedPassword = await hashPassword(password);

  /**
   * Create User in DB
   * Using Drizzle ORM's insert method
   * Returns the created user record
   * Excludes password from the response
   * Handled by asyncHandler for response formatting
   */
  const [createdUser] = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning();

  const { password: _, ...userDetails } = createdUser;

  return Response.created(userDetails, 'User created successfully');
});

/**
 * Signup Handler with Validation Middleware
 * - Combines input validation and signup logic
 * - Validates request body against SignupSchema
 * - Proceeds to signupHandler if validation passes
 * @exports signupHandlerWithValidation
 * @returns Created user details without password
 * @throws ValidationError if input validation fails
 * @throws ConflictError if username or email already exists
 * @throws InternalServerError for any other failures
 */
export const signupHandlerWithValidation = [validate(data => SignupSchema.parse(data)), signupHandler];

// TODO: Implement login logic with proper validation, error handling, and response formatting
/**
 * Login Handler
 * - Placeholder for user login functionality
 * - To be implemented with input validation, authentication, and response formatting
 * @exports loginHandler
 */
export const loginHandler = asyncHandler(async (req: ExpressRequest, res: ExpressResponse) => {
  const { email, password } = req.body;

  // check if user exists
  const userExists = await db.select().from(users).where(eq(users.email, email));
  if (!userExists.length) {
    throw ErrorHandler.AuthError('Invalid email');
  }

  // password verification
  const ispass = await comparePasswords(password, userExists[0].password);
  if (!ispass) {
    throw ErrorHandler.AuthError('Invalid password');
  }

  // created cookie with jwt and return user after login
  const { password: _p, ...userSafe } = userExists[0];
  const token = generateJWTandSetCookie(res, String(userExists[0].id));

  return Response.success({ token, user: userSafe }, 'Login successful');
});
