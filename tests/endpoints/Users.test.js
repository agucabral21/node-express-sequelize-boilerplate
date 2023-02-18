const request = require("supertest");
const app = require("../../src/config/app");
const { User, sequelize } = require("../../src/services/database");

beforeAll(async () => {
  await sequelize.sync();
});

afterEach(async () => {
  await User.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });

  await sequelize.close();
});

describe("Test POST /api/v1/users", () => {
  test("Should add a user correctly", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send(userData)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.firstName).toBe(userData.firstName);
  });
});
