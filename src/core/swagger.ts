import swaggerJSDoc from 'swagger-jsdoc';
import { env } from '@/env';

/**
 * Swagger/OpenAPI configuration
 *
 * - `openapi`: OpenAPI version
 * - `info`: API metadata
 * - `servers`: List of servers (development/production)
 * - `apis`: Glob patterns pointing to files with JSDoc comments for route documentation
 */
const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'NodeJS Backend API',
      version: '1.0.0',
      description: 'API documentation for NodeJS Backend project using Express and Drizzle ORM',
      contact: {
        name: 'Shubhojit Mitra',
        email: 'Shubhojit.120225@stu.upes.ac.in',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
    ],
  },
  // Paths to files where API JSDoc comments live
  apis: ['./src/routes/*.routes.ts'],
};
// Generate Swagger specification
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
