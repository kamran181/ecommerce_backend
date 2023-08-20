import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description :{
        type : String ,
        required : true 
    },
    file : {
        type : String ,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    price : {
        type : Number
    },
    quantity : {
        type : Number
    }
}) 

const Product = mongoose.model('productSchema ', productSchema);
export default Product;