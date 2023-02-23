const jwt = require("jsonwebtoken");

const generateJWT = (secret, payload = {}, options = {}) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject("Error generating web token");
      } else {
        resolve(token);
      }
    });
  });

const generateToken = (payload = {}) =>
  generateJWT(process.env.PRIVATE_API_KEY, payload);

module.exports = { generateToken };
