import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller.js';
import { validate } from '../validations/validate.js';
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  googleTokenSchema,
} from '../validations/auth.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/refresh-token', validate(refreshSchema), AuthController.refreshToken);
router.post('/logout', validate(refreshSchema), AuthController.logout);

// redirect ke Google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
);

// callback dari Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleLogin
);

// Google OAuth (API / Mobile)
router.post(
  '/google/token',
  validate(googleTokenSchema),
  AuthController.googleLoginToken
);


export default router;
