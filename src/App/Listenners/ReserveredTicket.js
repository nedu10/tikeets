// const User = require("../Models/User");
const Mail = require("../Handlers/mail");

const { EventEmitter } = require("events");

let em = new EventEmitter();

exports.em = em;

exports.sendMail = async () => {
  this.em.once("sendMail", async (options) => {
    await Mail.send(options);
  });
};
