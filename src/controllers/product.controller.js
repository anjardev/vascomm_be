import { Op } from 'sequelize';
import db from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

const { Product } = db;

class ProductController {
  static async getProducts(req, res) {
    const { take = 10, skip = 0, search = '' } = req.query;

    const products = await Product.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      limit: Number(take),
      offset: Number(skip),
    });

    return successResponse(res, 'List products', products);
  }

  static async getProductById(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return errorResponse(res, 'Product not found', 404);

    return successResponse(res, 'Product detail', product);
  }

  static async createProduct(req, res) {
    const product = await Product.create(req.body);
    return successResponse(res, 'Product created', product, 201);
  }

  static async updateProduct(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return errorResponse(res, 'Product not found', 404);

    await product.update(req.body);
    return successResponse(res, 'Product updated', product);
  }

  static async deleteProduct(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return errorResponse(res, 'Product not found', 404);

    await product.destroy();
    return successResponse(res, 'Product deleted');
  }
}

export default ProductController;
