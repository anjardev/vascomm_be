import { errorResponse } from '../utils/response.js';

export default (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return errorResponse(res, 'Forbidden', 403);
    }
    next();
  };
};
