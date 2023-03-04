const dotenv = require("dotenv");

dotenv.config();
const { sequelize } = require("../../../src/services").database;
const { UserService, RoleService } = require("../../../src/services");
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

describe("addUser tests", () => {
  test("should addUser and validate password", async () => {
    const userData = {
      firstName: "Agu",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "password",
    };
    const createdUser = await UserService.create(userData);
    expect(createdUser.email).toBe(userData.email);
    const validatePassword = createdUser.validPassword(userData.password);
    expect(validatePassword).toBeTruthy();
  });
  test("should throw error for invalid data", async () => {
    try {
      const userData = {
        firstName: {},
        lastName: {},
        email: {},
        password: {},
      };

      await UserService.create(userData);
    } catch (error) {
      expect(error.type).toBe("sequelize");
      expect(error.statusCode).toBe(400);
    }
  });
  test("should throw error for duplicate data", async () => {
    try {
      const userData = {
        firstName: "Agu",
        lastName: "Cabral",
        email: "agucabral@gmail.com",
        password: "password",
      };
      await UserService.create(userData);
    } catch (error) {
      expect(error.type).toBe("sequelize");
      expect(error.statusCode).toBe(409);
    }
  });
});

describe("findById test ", () => {
  test("should find existing", async () => {
    const userData = {
      firstName: "Agu",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "password",
    };
    const user = await UserService.create(userData);
    const findUser = await UserService.findById(user.id);
    expect(findUser.email).toBe(userData.email);
    const validatePassword = findUser.validPassword(userData.password);
    expect(validatePassword).toBeTruthy();
  });
  test("should find null for non existing user", async () => {
    const userData = {
      firstName: "Agu",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "password",
    };
    const user = await UserService.create(userData);
    const findUser = await UserService.findById(user.id + 1);
    expect(findUser).toBeFalsy();
  });
});

describe("Test addRole", () => {
  test("should add role", async () => {
    const userData = {
      firstName: "Agu",
      lastName: "Cabral",
      email: "agucabral@gmail.com",
      password: "password",
    };
    const user = await UserService.create(userData);
    const roleData = {
      name: "admin",
    };
    const role = await RoleService.create(roleData);
    await UserService.addRoles(user.id, role);
    await user.reload();
    const userRoles = await user.getRoles();
    expect(userRoles[0].name).toBe(roleData.name);
  });
  test("should throw error for non existing role", async () => {
    try {
      const userData = {
        firstName: "Agu",
        lastName: "Cabral",
        email: "agucabral@gmail.com",
        password: "password",
      };
      const user = await UserService.create(userData);

      await UserService.addRoles(user.id, 1);
    } catch (error) {
      expect(error.type).toBe("sequelize");
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe(
        "An error ocurred related to invalid reference keys"
      );
    }
  });
});
