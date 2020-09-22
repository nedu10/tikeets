process.env.NODE_ENV = "test";
const db = require("../config/db");
const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
// for decoding the token and easily extracting the id from the payload
const jsonwebtoken = require("jsonwebtoken");
// for hashing the password successfully when we create users
// const bcrypt = require("bcrypt-nodejs");

const User = require("../App/Models/user.models");
const RoleType = require("../App/Models/role.models");
const Reservation = require("../App/Models/reservation.models");
const Event = require("../App/Models/event.models");

// our global object for storing auth information
let password = "joe_secret";
const seed = [
  {
    label: "ADMIN",
  },
  {
    label: "USER",
  },
];

beforeAll(async () => {
  // Connect to db
  db.connect();
});

describe("POST /signup", () => {
  test("register users to the system", async () => {
    seed.forEach((each) => {
      var role_type = new RoleType(each);
      if (each.label == "ADMIN") {
        process.env.admin_role_id = role_type._id;
      } else {
        process.env.user_role_id = role_type._id;
      }
      role_type
        .save()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    });
    const register = await request.post("/signup").send({
      first_name: "John",
      last_name: "Doe",
      email: "john5.doe@gmail.com",
      role_id: process.env.user_role_id,
      password: password,
    });
    expect(register.body.status_code).toBe(201);
  });
});

//Admin signup test
describe("POST Admin /signup", () => {
  test("register admin to the system", async () => {
    const register = await request.post("/signup").send({
      first_name: "Tikeet",
      last_name: "Admin",
      email: "admin@tikeets.com",
      role_id: process.env.admin_role_id,
      password: password,
    });
    expect(register.body.status_code).toBe(201);
  });
});

//Login test
describe("POST /login", () => {
  test("Log into the system", async () => {
    const login = await request.post("/login").send({
      email: "john5.doe@gmail.com",
      password,
    });
    process.env.user_token = login.body.token;
    expect(login.body.status_code).toBe(201);
    expect(login.body.token).toBeTruthy();
  });
});
//Login test
describe("POST Admin /login", () => {
  test("Admin Log into the system", async () => {
    const login = await request.post("/login").send({
      email: "admin@tikeets.com",
      password,
    });
    process.env.admin_token = login.body.token;
    expect(login.body.status_code).toBe(201);
    expect(login.body.token).toBeTruthy();
  });
});

// Admin create event Test
describe("POST /events", () => {
  test("Admin creates an event", async () => {
    const create_event = await request
      .post("/events")
      .set("authorization", process.env.admin_token)
      .send({
        name: "Google Conference",
        location: "12, Saka Tinibu Street, Victoria Island, Lagos, Nigeria",
        details: "2020 Google conference limited to 500 guest",
        event_date: "2021-10-05T14:48:00.000Z",
        reservation_limit: 500,
      });
    expect(create_event.body.status_code).toBe(201);
  });
});

// get all upcoming event Test
describe("GET /events", () => {
  test("get all upcoming event", async () => {
    const get_events = await request
      .get("/events")
      .set("authorization", process.env.user_token);
    process.env.event_id = get_events.body.results[0]._id;
    expect(get_events.body.status_code).toBe(200);
  });
});

// update event Test
describe("PATCH /events/:event_id", () => {
  test("Update event", async () => {
    const update = await request
      .patch(`/events/${process.env.event_id}`)
      .set("authorization", process.env.admin_token)
      .send({
        name: "Google Conference2",
        reservation_limit: 500,
      });
    expect(update.body.status_code).toBe(202);
  });
});

// Book a ticket test
describe("POST /events/:event_id/ticket", () => {
  test("Book a ticket for an event", async () => {
    const book_ticket = await request
      .post(`/events/${process.env.event_id}/ticket`)
      .set("authorization", process.env.user_token);
    process.env.ticket_id = book_ticket.body.result._id;
    expect(book_ticket.body.status_code).toBe(201);
    expect(book_ticket.body.result).toBeTruthy();
  });
});

// User Get all his reservations
describe("GET /user/tickets", () => {
  test("Fetch All My reservations", async () => {
    const get_my_tickets = await request
      .get(`/user/tickets`)
      .set("authorization", process.env.user_token);
    expect(get_my_tickets.body.status_code).toBe(200);
    expect(get_my_tickets.body.results).toBeTruthy();
  });
});

// Cancel reservation
describe("PATCH /events/:event_id/:ticket_id", () => {
  test("Cancel reservation", async () => {
    const cancel_book_ticket = await request
      .patch(`/events/${process.env.event_id}/${process.env.ticket_id}`)
      .set("authorization", process.env.user_token);
    expect(cancel_book_ticket.body.status_code).toBe(202);
  });
});

// Delete Event
describe("DELETE /events/:event_id", () => {
  test("Delete Event", async () => {
    const delete_event = await request
      .delete(`/events/${process.env.event_id}`)
      .set("authorization", process.env.admin_token);
    expect(delete_event.body.status_code).toBe(200);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await Event.deleteMany({});
  await RoleType.deleteMany({});
  await Reservation.deleteMany({});
  db.disconnect();
});
