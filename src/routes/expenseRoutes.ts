import { Router } from 'express';
import { addExpense , getExpenses} from '../controllers/expenseController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authMiddleware, addExpense); 
router.get('/expenses', authMiddleware, getExpenses);

export default router;
