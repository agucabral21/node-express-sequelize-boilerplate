const errorResponse = ({ message = 'Some error ocurred.', errors = [] }) => ({
  success: false,
  message,
  errors,
});

const okResponse = ({ data = [], message = 'ok' }) => ({
  success: true,
  data,
  message,
});

module.exports = { okResponse, errorResponse };
