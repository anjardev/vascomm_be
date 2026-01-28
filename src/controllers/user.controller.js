import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

const { User } = db;

class UserController {
  static async getUsers(req, res) {
    try {
      const { take = 10, skip = 0, search = '' } = req.query;

      const users = await User.findAndCountAll({
        where: {
          name: { [Op.like]: `%${search}%` },
        },
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
        limit: Number(take),
        offset: Number(skip),
        distinct: true, // penting!
      });

      return successResponse(res, 'List users', users);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async getUserById(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) return errorResponse(res, 'User not found', 404);

    return successResponse(res, 'User detail', user);
  }

  static async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // cek email duplicate
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return errorResponse(res, 'Email already exists', 400);
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        provider: 'local',
      });

      // filter response
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return successResponse(res, 'User created', safeUser, 201);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return errorResponse(res, 'User not found', 404);

      const data = { ...req.body };

      // jika password diupdate → hash ulang
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      await user.update(data);

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return successResponse(res, 'User updated', safeUser);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return errorResponse(res, 'User not found', 404);

      await user.destroy(); // soft delete (paranoid true)

      return successResponse(res, 'User deleted');
    } catch (err) {
      return errorResponse(res, err.message);
    }
  }
}

export default UserController;
