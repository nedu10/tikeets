const nodemailer = require("nodemailer");
const ejs = require("ejs");
const juice = require("juice");
const path = require("path");
const htmlToText = require("html-to-text");

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const generateHTML = async (filename, options = {}) => {
  const html = await ejs.renderFile(
    path.join(__dirname, `../../views/emails/${filename}.ejs`),
    options
  );

  const inlined = juice(html);
  return inlined;
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: `Tikeets Team <noreply@tikeets.com>`,
    to: options.get_user.email,
    subject: options.subject,
    html: (await html).toString(),
    text,
  };

  transport
    .sendMail(mailOptions)
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
