import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { getUsers } from '../controllers/userController';

const router = Router();

router.get('/', verifyToken, getUsers);

export default router;
