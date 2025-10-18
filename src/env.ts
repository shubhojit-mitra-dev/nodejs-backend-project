import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).pipe(z.number().positive()).default(8080),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_URL: z.url("CORS_URL must be a valid URL").default("http://localhost:3000"),
  DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),
});

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

export const env = validateEnv();