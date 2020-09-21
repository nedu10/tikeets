const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const routes = require("./routes/index");

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("useCreateIndex", true);

app.use("/", routes);

module.exports = app;
