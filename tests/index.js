const request = require("supertest");

const app = require("../app");

describe("GET /users", function () {
  it("responds with json", function (done) {
    request(app).get("/user").expect("Content-Type", /json/).expect(200, done);
  });
});
