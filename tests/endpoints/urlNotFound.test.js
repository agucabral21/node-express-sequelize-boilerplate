const request = require("supertest");
const { app } = require("../../src/config");

describe("Test status endpoint.", () => {
  test("It should show service status.", (done) => {
    request(app)
      .get("/wrongUrl")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toBe(
          "Can't find /wrongUrl on this server!"
        );
        done();
      });
  });
});
