const User = require("../Models/user.models");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
// const expressJwt = require("express-jwt");

module.exports = {
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, first_name, last_name, email, role_id } = req.body;
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
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status_code: 404,
          status: "Error",
          message: "User does not exist!!! Please sign up",
        });
      }

      const result = await user.validatePassword(password);

      if (result) {
        const newObj = {
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role_id: user.role_id,
        };
        const token = jwt.sign(newObj, process.env.JWT_SECRET, {
          expiresIn: "10h",
          algorithm: "HS256",
        });
        return res.status(201).json({
          status_code: 201,
          status: "Successful",
          message: "Successfully Logged In",
          token,
        });
      } else {
        return res.status(401).json({
          status_code: 401,
          status: "Failed",
          message: "Auth failed",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status_code: 500,
        status: "Error",
        message: "Opps! Something went wrong.",
        error: error.message,
      });
    }
  },
};
