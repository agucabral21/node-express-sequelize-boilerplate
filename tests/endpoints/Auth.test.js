const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/config/app");
const { UserService, RoleService } = require("../../src/services");
const { sequelize } = require("../../src/services/database");
const { truncateDB } = require("../utils");

const secret = process.env.PRIVATE_API_KEY;

beforeAll(async () => {
  await sequelize.sync();
});

afterEach(async () => {
  await truncateDB();
});

afterAll(async () => {
  await truncateDB();

  await sequelize.close();
});

describe("Test POST /api/v1/auth", () => {
  test("Should authenticate user and return jwt", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const user = await UserService.create(userData);
    const role = await RoleService.create({ name: "admin" });
    await user.addRole(role);

    const body = {
      email: user.email,
      password: userData.password,
    };
    const response = await request(app)
      .post("/api/v1/auth")
      .set("Accept", "application/json")
      .send(body)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    const verifiedToken = await jwt.verify(response.body.data.token, secret);
    expect(verifiedToken.user.id).toBe(user.id);
    expect(verifiedToken.user.roles[0]).toBe(role.name);
  });

  test("Should return unauthorized", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const user = await UserService.create(userData);
    const role = await RoleService.create({ name: "admin" });
    await user.addRole(role);

    const body = {
      email: user.email,
      password: "badpass",
    };
    const response = await request(app)
      .post("/api/v1/auth")
      .set("Accept", "application/json")
      .send(body)
      .then((res) => res);
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Incorrect Password.");
  });

  test("Should return 400 for invalid body data", async () => {
    const body = {
      password: "badpass",
    };
    const response = await request(app)
      .post("/api/v1/auth")
      .set("Accept", "application/json")
      .send(body)
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid data.");
    expect(response.body.errors[0].msg).toBe("email cannot be empty");
  });

  test("Should return 400 for invalid body data", async () => {
    const body = {
      email: "adasdasdasd",
      password: "badpass",
    };
    const response = await request(app)
      .post("/api/v1/auth")
      .set("Accept", "application/json")
      .send(body)
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid data.");
    expect(response.body.errors[0].msg).toBe("email must have valid format");
  });
});
