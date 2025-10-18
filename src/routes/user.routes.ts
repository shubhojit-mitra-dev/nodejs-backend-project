import express, { Router } from 'express';
import { baseAPIHandler } from '@/controllers/user.controller';

const router: Router = express.Router()

router.route("/").get(baseAPIHandler);

export default router;