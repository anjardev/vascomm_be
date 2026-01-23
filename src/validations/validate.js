import { errorResponse } from '../utils/response.js';

export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false, // tampilkan semua error
    });

    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return errorResponse(res, message, 400);
    }

    next();
  };
};
