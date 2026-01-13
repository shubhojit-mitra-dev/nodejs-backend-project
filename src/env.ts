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
import logger from './core/logger';

// Load environment variables from .env file
dotenv.config();

/**
 * Zod schema for environment variables
 * @type {z.ZodObject}
 * @property {number} PORT - Server port number
 * @property {string} NODE_ENV - Application environment
 * @property {string} CORS_URL - Allowed CORS origin URL
 * @property {string} DATABASE_URL - Database connection URL
 * @property {string} LOG_DIR - Directory for log files
 * @property {string} JWT_SECRET_KEY - Secret key for JWT
 * @property {string} DB_HOST - Database host
 * @property {number} DB_PORT - Database port
 * @property {string} DB_USER - Database user
 * @property {string} DB_PASSWORD - Database password
 * @property {string} DB_NAME - Database name
 * @property {string} AWS_SQS_OTP_QUEUE_URL - AWS SQS OTP queue URL
 * @property {string} AWS_REGION - AWS region
 * @property {string} AWS_S3_LOG_BUCKET_NAME - AWS S3 log bucket name
 * @throws Will exit the process if validation fails
 * @returns {object} Validated environment variables
 */
const envSchema: z.ZodObject = z.object({
  PORT: z.string().transform(Number).pipe(z.number().positive()).default(8080),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_URL: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.url('DATABASE_URL must be a valid URL'),
  JWT_SECRET_KEY: z.string().min(10, 'JWT_SECRET_KEY must be set and at least 10 characters long'),
  LOG_DIR: z.string().default('logs'),
  THUNDERMAIL_API_KEY: z.string().min(1, 'THUNDERMAIL_API_KEY must be set'),
  THUNDERMAIL_API_URL: z.string().url('THUNDERMAIL_API_URL must be a valid URL'),
  THUNDERMAIL_FROM: z.string().default('onboarding@thundermail.io'),
  AWS_REGION: z.string().default('ap-south-1'),
  AWS_S3_LOG_BUCKET_NAME: z.string().min(1, 'AWS_S3_LOG_BUCKET_NAME must be set'),
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID must be set'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET must be set'),
  GOOGLE_REDIRECT_URI: z.string().min(1, 'GOOGLE_REDIRECT_URI must be set').optional(),
  GOOGLE_OAUTH_SCOPE: z.string().default('openid email profile'),
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
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
      LOG_DIR: process.env.LOG_DIR,
      THUNDERMAIL_API_KEY: process.env.THUNDERMAIL_API_KEY!,
      THUNDERMAIL_API_URL: process.env.THUNDERMAIL_API_URL!,
      THUNDERMAIL_FROM: process.env.THUNDERMAIL_FROM!,
      AWS_REGION: process.env.AWS_REGION!,
      AWS_S3_LOG_BUCKET_NAME: process.env.AWS_S3_LOG_BUCKET_NAME!,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI!,
      GOOGLE_OAUTH_SCOPE: process.env.GOOGLE_OAUTH_SCOPE!,
    });
  } catch (error) {
    logger.error('Invalid environment variables:');
    if (error instanceof z.ZodError) {
      error.issues.forEach(err => {
        logger.error(`- ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      logger.error(error);
    }
    process.exit(1);
  }
};

// Export the validated environment variables
export const env = validateEnv();
