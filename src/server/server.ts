import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from '@/env';
import userRoutes from '@/routes/user.routes';
import contactRoutes from '@/routes/todo.routes';
import { errorMiddleware } from '@/middlewares/error';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_URL, optionsSuccessStatus: 200 }));
app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV !== 'development',
  crossOriginEmbedderPolicy: env.NODE_ENV !== 'development',
}));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello from the backend API' });
});

app.use('/api/users', userRoutes);
app.use('/api/todos', contactRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

// Error middleware should be last
app.use(errorMiddleware);

export default app;