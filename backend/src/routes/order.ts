import { Router } from 'express';
import createOrder from '../controllers/order';
import { validateOrderCreation } from '../middlewares/validations';

const router = Router();

router.post('/order', validateOrderCreation, createOrder);

export default router;
