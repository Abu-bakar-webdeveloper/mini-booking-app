// routes/users.js
import express from 'express';
import { 
  getUsers, 
  createManager, 
  deleteManager 
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes protected and admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.post('/managers', createManager);
router.delete('/managers/:id', deleteManager);

export default router;