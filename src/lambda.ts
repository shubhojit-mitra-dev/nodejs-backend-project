import serverless from 'serverless-http';
import app from '@/server/server';
import { initDb } from '@/db';

let isDbInitialized = false;

// Initialize DB once per Lambda container (connection reuse across warm invocations)
const initializeDb = async () => {
  if (!isDbInitialized) {
    await initDb();
    isDbInitialized = true;
  }
};

export const handler = async (event: object, context: object) => {
  await initializeDb();
  return serverless(app)(event, context);
};
