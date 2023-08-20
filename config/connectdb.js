import mongoose from 'mongoose';

export const connectDb = async()=>{
    try {
       const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        console.log('mongoose connected successfully');
    } catch (error) {
        console.log(error);
    }
}