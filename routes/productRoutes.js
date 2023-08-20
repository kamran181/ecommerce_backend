import express from "express"
import multer from "multer"
import { isAuthentic } from "../middlewares/isAuthentic.js";
import { postProduct  ,getAllProducts, getSingleProduct ,deleteSingleProduct ,updateSingleProduct} from "../controllers/productController.js";

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  // Create the multer instance
const upload = multer({ storage: storage });

router.post('/product', isAuthentic,  upload.single('file'), postProduct);

router.get('/product',isAuthentic,getAllProducts);

router.put('/product/:id', isAuthentic, updateSingleProduct);

router.get('/product/:id',isAuthentic,getSingleProduct);

router.delete('/product/:id',isAuthentic,deleteSingleProduct);



export default router;