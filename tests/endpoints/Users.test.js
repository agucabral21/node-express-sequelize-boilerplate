const request = require("supertest");
const app = require("../../src/config/app");
const { UserService, RoleService } = require("../../src/services");
const { sequelize } = require("../../src/services/database");
const { truncateDB, getToken } = require("../utils");

let adminToken;
let userToken;

beforeAll(async () => {
  adminToken = await getToken(1, ["admin"]);
  userToken = await getToken(1, ["user"]);

  await sequelize.sync();
});

afterEach(async () => {
  await truncateDB();
});

afterAll(async () => {
  await truncateDB();

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
      .set("Authorization", `Bearer ${adminToken}`)
      .send(userData)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.firstName).toBe(userData.firstName);
  });

  test("Should return 401 for unauthorized user ", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userToken}`)
      .send(userData)
      .then((res) => res);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(
      "Unauthorized, you don't have required roles for this action."
    );
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
      .set("Authorization", `Bearer ${adminToken}`)
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
      .set("Authorization", `Bearer ${adminToken}`)
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
      .set("Authorization", `Bearer ${adminToken}`)
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
      .set("Authorization", `Bearer ${adminToken}`)
      .send(userData)
      .then((res) => res);

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].param).toBe("firstName");
    expect(response.body.errors[0].location).toBe("body");
    expect(response.body.errors[0].msg).toBe("value must be a string");
  });
});

describe("Test POST /api/v1/users/:id/roles", () => {
  test("Should add a role to a user correctly", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const user = await UserService.create(userData);
    const role = await RoleService.create({ name: "admin" });
    const rolesRequestBody = { roles: [role.id] };
    const response = await request(app)
      .post(`/api/v1/users/${user.id}/roles`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(rolesRequestBody)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    await user.reload();
    const userRoles = await user.getRoles();
    expect(userRoles[0].name).toBe(role.name);
  });

  test("Should return 400 for non existing role", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const user = await UserService.create(userData);
    const rolesRequestBody = { roles: [5] };
    const response = await request(app)
      .post(`/api/v1/users/${user.id}/roles`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(rolesRequestBody)
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Some roles are invalid, please check");
  });

  test("Should return 400 for invalid role body", async () => {
    const userData = {
      firstName: "Agustin",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "aguscali21",
    };
    const user = await UserService.create(userData);
    const rolesRequestBody = { roles: "1" };
    const response = await request(app)
      .post(`/api/v1/users/${user.id}/roles`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(rolesRequestBody)
      .then((res) => res);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid data.");
    expect(response.body.errors[0].param).toBe("roles");
    expect(response.body.errors[0].msg).toBe("Roles must be an array");
  });
});
