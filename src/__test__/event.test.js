// process.env.NODE_ENV = "test";
// const db = require("../config/db");
// const supertest = require("supertest");
// const app = require("../app");
// const request = supertest(app);
// const User = require("../App/Models/user.models");
// const RoleType = require("../App/Models/role.models");
// const Event = require("../App/Models/event.models");

// // process.env.SETUP_DATA
// // our global object for storing auth information
// let data = {};
// let password = "joe_secret";
// const seed = [
//   {
//     label: "ADMIN",
//   },
//   {
//     label: "USER",
//   },
// ];

// beforeAll(async () => {
//   // Connect to db
//   db.connect();
// });

// describe("POST /signup", () => {
//   test("register users to the system", async () => {
//     seed.forEach((each) => {
//       var role_type = new RoleType(each);
//       if (each.label == "ADMIN") {
//         data.admin_role_id = role_type._id;
//       } else {
//         data.user_role_id = role_type._id;
//       }
//       role_type
//         .save()
//         .then((res) => {})
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//     const hashedPassword = bcrypt.hashSync(
//       password,
//       bcrypt.genSaltSync(5),
//       null
//     );
//     const register = await request.post("/signup").send({
//       first_name: "John",
//       last_name: "Doe",
//       email: "john5.doe@gmail.com",
//       role_id: data.user_role_id,
//       password: hashedPassword,
//     });
//     // console.log(register);
//     expect(register.body.status_code).toBe(201);
//   });
// });

// afterAll(async () => {
//   //disconnect db
//   await User.remove({});
//   await RoleType.remove({});
//   console.log("data >> ", process.env.SETUP_DATA);
//   db.disconnect();
// });
