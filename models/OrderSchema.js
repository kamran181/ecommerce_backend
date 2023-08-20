import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address : {
     type  : String
    },
    qty : {
        type : Number
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    isPaid : {
        type : Boolean
    },
    totalPrice : {
        type : Number
    }

})

const Order = mongoose.model('Order', orderSchema);

export default Order;