const request = require("supertest");
const dotenv = require("dotenv");
const { app } = require("../../src/config");

dotenv.config();

describe("Test status endpoint.", () => {
  test("It should show service status.", (done) => {
    request(app)
      .get("/api/v1/status")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBeTruthy();
        done();
      });
  });
});
