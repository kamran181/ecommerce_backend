import express from 'express';

import dotenv from 'dotenv';

import bodyParser from 'body-parser';

dotenv.config();

import {connectDb} from './config/connectdb.js';

import userRoutes from './routes/userRoutes.js';

import productRoutes from './routes/productRoutes.js';

import orderRoutes from './routes/orderRoute.js';


connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
const PORT = process.env.PORT || 8080 ;

app.use('/api' ,userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`);
})

