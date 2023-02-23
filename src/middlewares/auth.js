const { errorResponse } = require("../utils/responses");

const authMiddleware =
  (roles = []) =>
  (req, res, next) => {
    let authenticated = false;
    if (req.tokenPayload?.user?.roles) {
      const { user } = req.tokenPayload;
      authenticated = !user.roles.some((r) => !roles.includes(r));
    }
    if (!authenticated) {
      return res.status(401).json(
        errorResponse({
          message:
            "Unauthorized, you don't have required roles for this action.",
        })
      );
    }
    return next();
  };

module.exports = authMiddleware;
