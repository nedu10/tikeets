const User = require("../Models/user.models");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { encryptPassword } = require("../Middleware/encryption");

module.exports = {
  async register(req, res) {
    const { password, first_name, last_name, email, role_id } = req.body;
    console.log("hello");
    const userObj = {
      first_name,
      last_name,
      email,
      role_id,
    };
    const user = new User(userObj);
    try {
      user.password = user.encryptPassword(password);

      await user.save();
      return res.status(201).json({
        status_code: 201,
        status: "Successful",
        message: "User Created Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status_code: 500,
        status: "Error",
        message: "Opps! Something went wrong.",
        error: error.message,
      });
    }
  },
};
