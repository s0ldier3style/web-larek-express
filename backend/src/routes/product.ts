import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product";
import { Router } from "express";
import {
  validateProductCreation,
  validateProductId,
} from "../middlewares/validations";

const router = Router();

router.get("/product", getAllProducts);
router.post("/product", validateProductCreation, createProduct);
router.get("/product/:id", validateProductId, getProductById);

export default router;
