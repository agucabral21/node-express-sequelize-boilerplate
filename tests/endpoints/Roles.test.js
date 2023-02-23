const request = require("supertest");
const app = require("../../src/config/app");
const { RoleService } = require("../../src/services");
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

describe("Test GET /api/v1/roles", () => {
  test("Should get all roles correctly", async () => {
    const roleData = { name: "admin" };
    const roleData2 = { name: "user" };

    await RoleService.create(roleData);
    await RoleService.create(roleData2);

    const response = await request(app)
      .get("/api/v1/roles")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(2);
  });

  test("Should return empty result", async () => {
    const response = await request(app)
      .get("/api/v1/roles")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(0);
  });

  test("Should return 401 for unauthorized", async () => {
    const response = await request(app)
      .get("/api/v1/roles")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userToken}`)
      .then((res) => res);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(
      "Unauthorized, you don't have required roles for this action."
    );
  });
});

describe("Test POST /api/v1/roles", () => {
  test("Should add a role correctly", async () => {
    const roleData = { name: "admin" };
    const response = await request(app)
      .post("/api/v1/roles")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(roleData)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe(roleData.name);
  });

  test("Should return 400 for invalid data", async () => {
    const roleData = { name: 1 };
    const response = await request(app)
      .post("/api/v1/roles")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(roleData)
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid data.");
    expect(response.body.errors[0].param).toBe("name");
    expect(response.body.errors[0].msg).toBe("name must be a string");
  });

  test("Should return 401 for unauthorized", async () => {
    const roleData = { name: 1 };
    const response = await request(app)
      .post("/api/v1/roles")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userToken}`)
      .send(roleData)
      .then((res) => res);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(
      "Unauthorized, you don't have required roles for this action."
    );
  });
});
