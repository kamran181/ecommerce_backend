import Order from "../models/OrderSchema.js";
import Product from "../models/Product.js";

export const getOrders = async (req, res, next) => {
    try {
        const data = await Order.find({});
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

export const postOrder = async (req, res, next) => {

    try {
        const { product, qty, address, isPaid  } = req.body
        const findProduct = await Product.findById({_id : product});
        const updatedQuantity = findProduct.quantity - qty;
        const price = findProduct.price * qty;

        const updatedProduct = {
            _id : findProduct._id,
            title : findProduct.title,
            description : findProduct.description,
            file : findProduct.file,
            user : findProduct.user,
            price : findProduct.price,
            quantity : updatedQuantity
        }

        console.log('updatedProduct', updatedProduct);

        const updatedPro = await Product.findByIdAndUpdate({_id : product}, updatedProduct, {new : true});
        console.log('updatedPro', updatedPro);

        const order = new Order({
            address,
            isPaid,
            qty,
            totalPrice : price,
            user : req.user._id,
            product 
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder)



        
    } catch (error) {
        console.log(error);
    }

}