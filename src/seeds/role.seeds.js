const mongoose = require("mongoose");
const RoleType = require("../App/Models/role.models");
const User = require("../App/Models/user.models");

//setting up DB
var dbURL = "mongodb://nedu11:Ifediorah22@ds345937.mlab.com:45937/tikeets"; //locally installed mongodb

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const seed = [
  {
    label: "ADMIN",
  },
  {
    label: "USER",
  },
];

seed.forEach(async (each) => {
  var role_type = new RoleType(each);
  role_type
    .save()
    .then((res) => {
      console.log(`seeded ${each.label} successfully`);
    })
    .catch((err) => {
      console.log(err);
    });

  if (each.label == "ADMIN") {
    const userObj = {
      first_name: "Tikeet",
      last_name: "Admin",
      email: "admin@tikeets.com",
      role_id: role_type._id,
    };
    const user = new User(userObj);
    user.password = user.encryptPassword("tikeet_password");

    await user.save();
    console.log("Admin seeded successfully");
  }
});
