const { validationResult } = require('express-validator');
const { badRequestResponse } = require('../utils/response');

/**
 * Handle validation errors
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value,
    }));

    return badRequestResponse(res, 'Validation failed', formattedErrors);
  }

  next();
};

module.exports = {
  handleValidation,
};
