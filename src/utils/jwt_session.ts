import jwt from 'jsonwebtoken';
import type { Response as ExpressResponse } from 'express';
import { env } from '@/env';

export const generateJWTandSetCookie = (_res: ExpressResponse, userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET_KEY as string, { expiresIn: '7d' });
};
