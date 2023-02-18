const { okResponse } = require("../utils").responses;
const { User } = require("../services/database");

async function add(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const userData = { firstName, lastName, email, password };
  const user = await User.create(userData);
  const data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return res.status(200).send(okResponse({ data }));
}

module.exports = { add };
