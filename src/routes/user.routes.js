import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { validate } from '../validations/validate.js';
import {
  createUserSchema,
  updateUserSchema,
} from '../validations/user.validation.js';

const router = Router();

router.use(authMiddleware);

router.get('/', roleMiddleware('admin'), UserController.getUsers);
router.get('/:id', roleMiddleware('admin'), UserController.getUserById);

router.post(
  '/',
  roleMiddleware('admin'),
  validate(createUserSchema),
  UserController.createUser
);

router.put(
  '/:id',
  roleMiddleware('admin'),
  validate(updateUserSchema),
  UserController.updateUser
);

router.delete('/:id', roleMiddleware('admin'), UserController.deleteUser);

export default router;
