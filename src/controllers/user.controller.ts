import { Request, Response } from 'express';

export const baseAPIHandler = (_req: Request, res: Response) => {
  res.json({ message: 'Hello from the User API' });
};
