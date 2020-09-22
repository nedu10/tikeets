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

// our global object for storing auth information
let data = {};
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
        data.admin_role_id = role_type._id;
      } else {
        data.user_role_id = role_type._id;
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
      role_id: data.user_role_id,
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
      role_id: data.admin_role_id,
      password: password,
    });
    // console.log(register);
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
    data.user_token = login.body.token;
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
    data.admin_token = login.body.token;
    expect(login.body.status_code).toBe(201);
    expect(login.body.token).toBeTruthy();
  });
});

afterAll(async () => {
  //disconnect db
  await User.remove({});
  await RoleType.remove({});
  //   console.log("data >> ", data);
  db.disconnect();
});

process.env.SETUP_DATA = data;
