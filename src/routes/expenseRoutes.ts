import { Router } from 'express';
import { addExpense , deleteExpense, getExpenses, updateExpense} from '../controllers/expenseController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authMiddleware, addExpense); 
router.get('/expenses', authMiddleware, getExpenses);
router.put('/update/:id', authMiddleware, updateExpense);
router.delete('/delete/:id', authMiddleware, deleteExpense);

export default router;
