import jwt from 'jsonwebtoken';

import User from '../models/userSchema.js';

export const isAuthentic = async(req,res,next) =>{
    try {
        const authHeader = req.headers["authorization"];
        console.log('authHeader', authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        if(token==null){
            res.status(401).json({"message" : "not authorized"})
        }

        const decode = await jwt.verify(token ,'jwt_secret');
        console.log('decode', decode);
        const user = await User.findById({_id:decode.id})
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}