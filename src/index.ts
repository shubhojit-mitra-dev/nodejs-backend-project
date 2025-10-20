import { env } from '@/env';
import app from '@/server/server';
import { initDb } from '@/db';

async function startServer() {
  try {
    // Connect to database before starting the server
    await initDb();

    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
