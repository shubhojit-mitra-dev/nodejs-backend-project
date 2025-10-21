import jwt from 'jsonwebtoken';
import type { Response as ExpressResponse } from 'express';
import { env } from '@/env';

export const generateJWTandSetCookie = (res: ExpressResponse, userId: string) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET_KEY as string, { expiresIn: '7d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
