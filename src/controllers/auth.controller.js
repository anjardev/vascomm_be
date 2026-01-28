import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/token.js';

const { User, RefreshToken } = db;

class AuthController {
  static async googleLogin(req, res) {
    try {
      const user = req.user;

      if (!user) return errorResponse(res, "Google authentication failed", 401);

      const payload = { id: user.id, role: user.role };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const expiredAt = new Date();
      expiredAt.setDate(expiredAt.getDate() + 7);

      await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiredAt,
      });

      return successResponse(res, "Login Google success", {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hash,
        role: role || 'user',
      });

      return successResponse(res, 'User registered', user);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return errorResponse(res, 'User not found', 404);

      const match = await bcrypt.compare(password, user.password);
      if (!match) return errorResponse(res, 'Invalid credentials', 401);

      const payload = { id: user.id, role: user.role };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      const expiredAt = new Date();
      expiredAt.setDate(expiredAt.getDate() + 7);

      await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
        expiredAt,
      });

      return successResponse(res, 'Login success', {
        accessToken,
        refreshToken,
      });
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken)
        return errorResponse(res, 'Refresh token required', 400);

      const storedToken = await RefreshToken.findOne({
        where: { token: refreshToken },
      });

      if (!storedToken)
        return errorResponse(res, 'Invalid refresh token', 401);

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      const payload = { id: decoded.id, role: decoded.role };
      const newAccessToken = generateAccessToken(payload);

      return successResponse(res, 'Token refreshed', {
        accessToken: newAccessToken,
      });
    } catch (err) {
      return errorResponse(res, 'Invalid or expired refresh token', 401);
    }
  }

  static async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      await RefreshToken.destroy({
        where: { token: refreshToken },
      });

      return successResponse(res, 'Logout success');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
}

export default AuthController;
