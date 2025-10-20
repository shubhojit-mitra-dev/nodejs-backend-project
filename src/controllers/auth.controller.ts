import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schemas';
import logger from '@/core/logger';

const signuphandler = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as {
      email?: string;
      password?: string;
      username?: string;
    };

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'username, email and password are required',
      });
    }

    // Check if email already exists
    const existingemail = await db.select().from(users).where(eq(users.email, email));
    if (existingemail.length) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
      });
    }

    // Check if username already exists
    const existingusername = await db.select().from(users).where(eq(users.username, username));
    if (existingusername.length) {
      return res.status(409).json({
        success: false,
        message: 'Username already in use',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    const [created] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedpass,
      })
      .returning();

    /**
     * Drizzle returns a row object here. Define a local type to avoid `any`.
     * Keep fields in sync with `src/db/schemas/user.schema.ts`.
     */
    interface UserRow {
      id: number;
      username: string;
      email: string;
      password: string;
      isVerified?: boolean;
      createdAt: string;
    }

    const createdUser = created as unknown as UserRow;
    const { password: _p, ...userdetails } = createdUser;

    return res.status(201).json({ success: true, user: userdetails });
  } catch (error) {
    logger.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const loginhandler = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'User logged in successfully',
  });
};

export { loginhandler, signuphandler };
