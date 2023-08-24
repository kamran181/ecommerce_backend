import express from 'express';
import { isAuthentic } from '../middlewares/isAuthentic.js';
import { getOrders, getSingleOrder, postOrder } from '../controllers/orderController.js';

const route = express.Router();

route.get('/order', isAuthentic, getOrders)
route.post('/order', isAuthentic, postOrder)
route.get('/order/:id', isAuthentic,getSingleOrder )


export default route