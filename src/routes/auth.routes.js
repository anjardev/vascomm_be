import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller.js';
import { validate } from '../validations/validate.js';
import Joi from 'joi';

const router = Router();

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/refresh-token', validate(refreshSchema), AuthController.refreshToken);
router.post('/logout', validate(refreshSchema), AuthController.logout);

// redirect ke Google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// callback dari Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleLogin
);


export default router;
