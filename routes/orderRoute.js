import express from 'express';
import { isAuthentic } from '../middlewares/isAuthentic.js';
import { getOrders, postOrder } from '../controllers/orderController.js';

const route = express.Router();

route.get('/order', isAuthentic, getOrders)
route.post('/order', isAuthentic, postOrder)


export default route