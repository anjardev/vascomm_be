import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

export default (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return errorResponse(res, 'Unauthorized', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return errorResponse(res, 'Invalid token', 401);
  }
};
