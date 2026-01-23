import { Router } from 'express';

// routes
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import productRoutes from './product.routes.js';

const router = Router();

// health check
router.get('/', (req, res) => {
  return res.json({
    code: 200,
    message: 'API is running',
    data: null,
  });
});

// API v1
router.use('/v1/auth', authRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/products', productRoutes);

export default router;
