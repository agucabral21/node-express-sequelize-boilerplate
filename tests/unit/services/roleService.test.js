const dotenv = require("dotenv");

dotenv.config();
const { sequelize } = require("../../../src/services/database");
const { RoleService } = require("../../../src/services");
const { truncateDB } = require("../../utils");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await truncateDB();
});

afterEach(async () => {
  await truncateDB();
});

afterAll(async () => {
  await truncateDB();
  await sequelize.close();
});

describe("addRole tests", () => {
  test("should addRole and validate password", async () => {
    const roleData = {
      name: "admin",
    };
    const createdRole = await RoleService.create(roleData);
    expect(createdRole.name).toBe(roleData.name);
  });
  test("should throw error for invalid data", async () => {
    try {
      const roleData = {
        name: "",
      };
      await RoleService.create(roleData);
    } catch (error) {
      expect(error.type).toBe("sequelize");
      expect(error.statusCode).toBe(400);
    }
  });
  test("should throw error for duplicate data", async () => {
    try {
      const roleData = {
        name: "admin",
      };
      await RoleService.create(roleData);
      await RoleService.create(roleData);
    } catch (error) {
      expect(error.type).toBe("sequelize");
      expect(error.statusCode).toBe(409);
    }
  });
});
