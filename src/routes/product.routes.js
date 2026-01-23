import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validate } from '../validations/validate.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validations/product.validation.js';

const router = Router();

router.use(authMiddleware);

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

router.post(
  '/',
  validate(createProductSchema),
  ProductController.createProduct
);

router.put(
  '/:id',
  validate(updateProductSchema),
  ProductController.updateProduct
);

router.delete('/:id', ProductController.deleteProduct);

export default router;
