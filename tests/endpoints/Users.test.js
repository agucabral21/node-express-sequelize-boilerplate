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

  test("Should return 400 for invalid email format", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabralgmail.com",
      password: "aguscali21",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send(userData)
      .then((res) => res);

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].param).toBe("email");
    expect(response.body.errors[0].location).toBe("body");
    expect(response.body.errors[0].msg).toBe("email must have valid format");
  });

  test("Should return 400 for empty email", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      password: "aguscali21",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send(userData)
      .then((res) => res);

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].param).toBe("email");
    expect(response.body.errors[0].location).toBe("body");
    expect(response.body.errors[0].msg).toBe("email cannot be empty");
  });

  test("Should return 400 for invalid password length", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "as",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send(userData)
      .then((res) => res);

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].param).toBe("password");
    expect(response.body.errors[0].location).toBe("body");
    expect(response.body.errors[0].msg).toBe(
      "password must have at least 8 characters"
    );
  });

  test("Should return 400 for invalid firstName type", async () => {
    const userData = {
      firstName: 123,
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "as",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .send(userData)
      .then((res) => res);

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].param).toBe("firstName");
    expect(response.body.errors[0].location).toBe("body");
    expect(response.body.errors[0].msg).toBe("value must be a string");
  });
});
