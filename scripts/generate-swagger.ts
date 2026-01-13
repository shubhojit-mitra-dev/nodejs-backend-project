import swaggerJSDoc from 'swagger-jsdoc';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'Tasks Backend API Documentation',
      version: '1.0.0',
      description: 'API documentation for Task Management System',
      contact: {
        name: 'Shubhojit Mitra',
        email: 'Shubhojit.120225@stu.upes.ac.in',
        url: 'https://shubhojitmitra.live',
      },
    },
    // Servers is empty to allow Swagger UI to default to the current host
    servers: [],
  },
  apis: [join(__dirname, '../src/routes/*.routes.ts')],
};

const spec = swaggerJSDoc(swaggerOptions);
const outPath = join(__dirname, '../src/core/swagger-spec.json');
writeFileSync(outPath, JSON.stringify(spec, null, 2));
console.log('Swagger spec generated:', outPath);
