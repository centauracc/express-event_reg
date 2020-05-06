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

  test("GET / should display a list of API endpoints", async () => {
    const routeList = {
      "0": "GET /",
      "1": "GET /events",
      "2": "GET /events:id",
      "3": "POST /events",
      "4": "PUT /events/:id",
      "5": "DELETE /events/:id",
      "6": "POST /users/login",
      "7": "POST /users/logout",
    };

    const { body } = await request(app).get("/").expect(200);
    expect(body).toMatchObject(routeList);
  });

  test("GET /events should display a list of events", async () => {
    const { body } = await request(app).get("/events").expect(200);

    eventData[0].date = eventData[0].date.toISOString();
    eventData[1].date = eventData[1].date.toISOString();

    expect(body).toMatchObject(eventData);
  });

  test("POST /events should create an event", async () => {
    const { body } = await request(app)
      .post("/events")
      .send(eventData[0])
      .expect(201);
    expect(body).toMatchObject(eventData[0]);
  });

  test("PUT /events/:id should modify an event", async () => {
    const { _id: eventIdToModify } = await Event.findOne({
      title: eventData[0].title,
    })
      .select("_id")
      .lean();

    const eventToModify = {
      title: "Film Marathon",
      date: new Date("May 23, 2020 17:00:00 +0800"),
      venue: {
        address: "42 Ah Seng Road #02-02",
        postalCode: "750786",
      },
      description: "Wear mask and rest by side of void deck",
    };

    const { body } = await request(app)
      .put(`/events/${eventIdToModify}`)
      .send(eventToModify)
      .expect(200);

    eventToModify.date = eventToModify.date.toISOString();
    expect(body).toMatchObject(eventToModify);
  });

  test("DELETE /:id should delete an event", async () => {
    const { _id: eventIdToDelete } = await Event.findOne({
      title: eventData[1].title,
    })
      .select("_id")
      .lean();

    const { body } = await request(app)
      .delete(`/events/${eventIdToDelete}`)
      .expect(200);

    expect(body).toMatchObject(eventData[1]);
  });
});
