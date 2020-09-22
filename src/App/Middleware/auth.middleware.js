const jwt = require("jsonwebtoken");
const Role = require("../Models/role.models");

module.exports = {
  auth: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Unauthorized! You must be logged in",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.current_user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Auth failed",
      });
    }
  },
  admin_auth: async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Unauthorized! You must be logged in",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const get_role = await Role.findOne({ _id: decoded.role_id });
      if (get_role.label === "ADMIN") {
        req.current_user = decoded;
        return next();
      }
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Auth failed",
      });
    } catch (error) {
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Auth failed",
      });
    }
  },
  user_auth: async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Unauthorized! You must be logged in",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const get_role = await Role.findOne({ _id: decoded.role_id });
      if (get_role.label === "USER") {
        req.current_user = decoded;
        return next();
      }
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Auth failed",
      });
    } catch (error) {
      return res.status(401).json({
        status_code: 401,
        status: "Failed",
        message: "Auth failed",
      });
    }
  },
};
