const request = require("supertest");
const app = require("../app");
const Event = require("../models/event.model");
const teardownMongoose = require("../../tests/mongoose");
const eventData = require("../../data/eventData");

describe("event.controller", () => {
  afterAll(async () => {
    await teardownMongoose();
  });

  beforeEach(async () => {
    await Event.create(eventData);
  });

  afterEach(async () => {
    await Event.deleteMany();
  });

  it("should display a list of routes", async () => {
    const routeList = {
      "0": "GET /",
      "1": "GET /events",
      "2": "GET /events:id",
      "3": "POST /events",
      "4": "PATCH /events/:id",
      "5": "DELETE /events/:id",
      "6": "POST /user/login",
      "7": "POST /user/logout",
    };

    const { body } = await request(app).get("/").expect(200);
    expect(body).toMatchObject(routeList);
  });

  it("should display a list of events", async () => {
    const { body } = await request(app).get("/events").expect(200);

    eventData[0].date = eventData[0].date.toISOString();
    eventData[1].date = eventData[1].date.toISOString();

    expect(body).toMatchObject(eventData);
  });
});
