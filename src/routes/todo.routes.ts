import express, { type Router } from 'express';
import { baseAPIHandler } from '@/controllers/todo.controller';

const router: Router = express.Router();

/**
 * @openapi
 * /api/todos:
 *   get:
 *     summary: Get a simple test message from the Todo API
 *     tags:
 *       - Todos
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
 *                   example: Hello from the Todo API
 */
router.route('/').get(baseAPIHandler);

export default router;
