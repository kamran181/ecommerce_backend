import Product from "../models/Product.js";


/**
 *  postProduct method creates a single product in mongoose
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const postProduct = async (req, res, next) => {
    try {

        const { title, description, price, quantity } = req.body;
        console.log('fff', req.body);
        console.log('fff', req.file);

        const product = new Product({
            title,
            description,
            price,
            quantity,
            user: req.user._id,
            file: req.file.originalname
        })
        console.log('product', product);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct)

    } catch (error) {
        console.log(error);
        res.status(405).end()
    }
}

/**
 * getAllProducts method gets all products from mongoose
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getAllProducts = async (req, res, next) => {
    try {
        const user = req.user.email;
        const product = await Product.find({});
        res.status(200).send(product)
        console.log(user);

    } catch (error) {
        console.log(error);
        res.status(405).end();
    }

}

/**
 * getSingleProduct method gets a single product from mongoose
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(405).end();
    }
}

/**
 * deleteSingleProduct method deletes a single product from mongoose
 */

export const deleteSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(405).end();
    }
}

/**
 * updateSingleProduct method updates a single user from mongoose
 */

export const updateSingleProduct = async (req, res, next) => {
    try {
        console.log("body....",req.body);
        const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        console.log(req.body);
        if (updatedProduct) {
            res.status(201).json(updatedProduct)

        }
        else {
            res.status(422).json({ message: "something went wrong" });
        }
    } catch (error) {
        console.log(error);
        res.status(405).end();
    }
}