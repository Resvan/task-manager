import { Router } from 'express';
import { getTaskByProject, getTasks } from '../controllers/taskController';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskByProject);

export default router;
