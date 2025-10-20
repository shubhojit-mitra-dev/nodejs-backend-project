/**
 * Note from the Developer
 * 1. Make sure to document all your API routes using JSDoc comments.
 * 2. This will help in generating accurate Swagger documentation.
 * 3. Use the /api-docs endpoint to view the generated API documentation.
 */

import express, { type Router } from 'express';
import { baseAPIHandler } from '@/controllers/user.controller';

const router: Router = express.Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get a simple test message from the User API
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns a welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from the User API
 */
router.route('/').get(baseAPIHandler);

export default router;
