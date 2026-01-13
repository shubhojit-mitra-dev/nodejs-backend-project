/**
 * Express server setup
 * - Configures middleware, routes, and error handling
 * - Uses security best practices with Helmet
 * - Enables CORS for specified origins
 * Exports the configured Express application
 *
 * @module server
 * @requires express
 * @requires cors
 * @requires helmet
 * @requires @/env
 * @requires @/routes/user.routes
 * @requires @/routes/todo.routes
 * @requires @/middlewares/error
 * @exports app - Configured Express application
 */
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { swaggerSpec } from '@/core/swagger';
import { env } from '@/env';
import { errorMiddleware } from '@/middlewares/error';
import { asyncHandler } from '@/utils/asyncHandler';
import userRoutes from '@/routes/user.routes';
import authRoutes from '@/routes/auth.routes';
import taskRoutes from '@/routes/task.routes';
import healthRoutes from '@/routes/health.routes';

// Initialize Express app
const app: express.Application = express();

/**
 * Middleware Configuration
 * - JSON parsing
 * - URL-encoded data parsing
 * - CORS with specified origin
 * - Security headers with Helmet
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_URL as string, optionsSuccessStatus: 200 }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'", 'unpkg.com'],
        'style-src': ["'self'", "'unsafe-inline'", 'unpkg.com'],
        'img-src': ["'self'", 'data:', 'unpkg.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

// Basic route for health check
app.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ status: 'healthy', message: `Visit API documentation at /api-docs` });
  }),
);

/**
 * Swagger UI route
 * - Exposes the API documentation at /api-docs
 */
// Swagger UI — CDN-based, no static file redirect issues in Lambda/API Gateway
app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));
app.get('/api-docs', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Tasks API Docs</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({ 
      url: 'api-docs.json', 
      dom_id: '#swagger-ui', 
      presets: [
        SwaggerUIBundle.presets.apis, 
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ], 
      layout: 'BaseLayout' 
    });
  };
</script>
</body>
</html>`);
});

/**
 * API Routes
 * - User routes at /api/users
 * - Task routes at /api/tasks
 */
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

/**
 * 404 Handler
 * Catches all unmatched routes and returns a 404 response
 */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

/**
 * Global Error Handling Middleware
 * Catches errors thrown in routes and middlewares
 * Formats and sends error responses to the client
 * Differentiates between development and production environments
 * for verbosity of error information returned
 *
 * In development mode, detailed error information including stack traces
 * and metadata is included in the response to aid debugging.
 * In production mode, only essential error information is sent to avoid
 * leaking sensitive details.
 */
app.use(errorMiddleware);

export default app;
