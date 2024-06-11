import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { addMembersToGroup, createNewProject, getProjectMembers, getProjects } from '../controllers/projectController';


const router = Router();

router.get('/', verifyToken, getProjects);
router.post('/', verifyToken, createNewProject);
router.post('/add-members', verifyToken, addMembersToGroup);
router.get('/get-members/:id', verifyToken, getProjectMembers);

export default router;
