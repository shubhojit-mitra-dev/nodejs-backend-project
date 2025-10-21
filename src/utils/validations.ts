import { z } from 'zod';

export const SignupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
