/**
 * Environment Variable Validation Module
 *
 * Validates and parses environment variables using Zod schema.
 * Exits the process with an error message if validation fails.
 * Exports a validated `env` object for use throughout the application.
 *
 * Ensures type safety and proper defaults for environment configuration.
 *
 * @module env
 * @requires zod
 * @requires dotenv
 * @exports env - Validated environment variables
 *
 * --- IGNORE ---
 *
 * This file is excluded from code coverage as it primarily deals with
 * configuration and does not contain business logic.
 *
 * --- END IGNORE ---
 */
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Zod schema for environment variables
 * @type {z.ZodObject}
 * @property {number} PORT - Server port number
 * @property {string} NODE_ENV - Application environment
 * @property {string} CORS_URL - Allowed CORS origin URL
 * @property {string} DATABASE_URL - Database connection URL
 * @throws Will exit the process if validation fails
 * @returns {object} Validated environment variables
 */
const envSchema: z.ZodObject = z.object({
  PORT: z.string().transform(Number).pipe(z.number().positive()).default(8080),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_URL: z.url('CORS_URL must be a valid URL').default('http://localhost:3000'),
  DATABASE_URL: z.url('DATABASE_URL must be a valid URL'),
});

/**
 * Validates and parses environment variables.
 * @returns {object} Validated environment variables
 * @throws Will exit the process if validation fails
 */
const validateEnv = () => {
  try {
    return envSchema.parse({
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV,
      CORS_URL: process.env.CORS_URL,
      DATABASE_URL: process.env.DATABASE_URL,
    });
  } catch (error) {
    console.error('Invalid environment variables:');
    if (error instanceof z.ZodError) {
      error.issues.forEach(err => {
        console.error(`- ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

// Export the validated environment variables
export const env = validateEnv();
