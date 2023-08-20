import  express from "express";
import multer from 'multer';
const router = express.Router();
import{signUp, signin, } from '../controllers/userController.js'
import { isAuthentic } from "../middlewares/isAuthentic.js";


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/profile');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  // Create the multer instance
const upload = multer({ storage: storage });

router.post('/signup', upload.single('profile'), signUp);

router.post('/signin', signin);




export default router;