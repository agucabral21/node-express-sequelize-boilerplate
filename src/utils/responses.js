const errorResponse = ({ data = [], message = 'Some error ocurred.', errors = [] }) => ({
  success: false,
  message,
  data,
  errors,
});

const okResponse = ({ data = [], message = 'ok' }) => ({
  success: true,
  data,
  message,
});

module.exports = { okResponse, errorResponse };
