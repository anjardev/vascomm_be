export const successResponse = (res, message, data = null, code = 200) => {
  return res.status(code).json({
    code,
    message,
    data,
  });
};

export const errorResponse = (res, message, code = 500) => {
  return res.status(code).json({
    code,
    message,
    data: null,
  });
};
