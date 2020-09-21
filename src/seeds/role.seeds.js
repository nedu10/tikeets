const mongoose = require("mongoose");
const RoleType = require("../App/Models/role.models");

//setting up DB
var dbURL = "mongodb://127.0.0.1:27017/tikeets"; //locally installed mongodb

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

seed.forEach((each) => {
  var role_type = new RoleType(each);
  role_type
    .save()
    .then((res) => {
      console.log(`seeded ${each.label} successfully`);
    })
    .catch((err) => {
      console.log(err);
    });
});
