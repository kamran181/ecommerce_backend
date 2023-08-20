import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';


/**
 * signup method creates a single user in mongoose
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const signUp = async(req, res, next) => {
  const {firstName ,lastName , email , password} = req.body;
  try {
    const existingEmail = await User.findOne({email : email});

    if(existingEmail){
        res.json({'message': 'email already exists'})
    }

    const hashedPassword = await bcrypt.hash(password , 12);
    console.log('req.file', req.file);
    const user = new User ({
        firstName,
        lastName,
        email,
        password : hashedPassword,
        profile : req.file.originalname
    });

    const savedUser = await user.save();
    if(savedUser){
        res.status(201).send(savedUser);
    }
  } catch (error) {
    console.log(error);
  }

}


/**
 * signin method compares the user credentials and database credentials and creates a token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const signin = async(req,res,next) =>{
    const {email ,password} = req.body;
    try {
     const isEmail = await User.findOne({email:email});
     if(!isEmail){
      return res.status(401).json({msg : "invlaid creds"})
     }

     const isPasswordCorrect = await bcrypt.compare(password, isEmail.password);

     if(!isPasswordCorrect){
       return res.status(401).json({msg : "invlaid creds"})
     }
     
    
     let token = jwt.sign({id : isEmail._id.toHexString()}, 'jwt_secret', {expiresIn : "1d"});

     res.status(201).json({
      isEmail,
      token : token
     })

    } catch (error) {
      console.log(error);
    }
}

