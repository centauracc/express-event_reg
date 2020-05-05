const request = require("supertest");
const app = require("../app");
const User = require("../models/user.model");
const teardownMongoose = require("../../tests/mongoose");
const userData = require("../../data/userData");

describe("user.controller", () => {
  afterAll(async () => {
    await teardownMongoose();
  });

  beforeEach(async () => {
    await User.create(userData);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  test("POST /users/login should allow user to sign in", async () => {
    const userToSignIn = userData[0];

    const { text } = await request(app)
      .post("/users/login")
      .send(userToSignIn)
      .expect(200);
    expect(text).toEqual("You are now logged in");
  });

  test("POST /users/logout should allow user to sign out", async () => {
    const response = await request(app).post("/users/logout").expect(200);
    expect(response.text).toBe("You are now logged out");
    expect(response.headers["set-cookie"][0]).toMatch(/^token=;/);
  });

  test("POST /users should create a user", async () => {
    const newUser = {
      username: "superAdmin",
      password: "87654321",
    };

    const { body } = await request(app)
      .post("/users")
      .send(newUser)
      .expect(201);

    expect(body.username).toEqual(newUser.username.toLowerCase());
    expect(body.password).not.toBe(newUser.password);
  });
});
