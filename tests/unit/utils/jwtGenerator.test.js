const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const secret = process.env.PRIVATE_API_KEY;

const { generateToken } = require("../../../src/utils/jwtGenerator");

describe("jwtGenerator test", () => {
  test("should generate correct token with desired payload", async () => {
    const payload = { user: { id: 1, roles: ["admin", "user"] } };
    const token = await generateToken(payload);
    const verifiedToken = await jwt.verify(token, secret);
    expect(verifiedToken.user.id).toBe(payload.user.id);
  });

  test("should generate correct token with empty", async () => {
    const token = await generateToken();
    const verifiedToken = await jwt.verify(token, secret);
    expect(verifiedToken).toBeTruthy();
    expect(verifiedToken.iat).toBeTruthy();
  });
});
