const connectDb = require("./src/config/db");
const app = require("./src/app.js");

// Main function to connect to the database
connectDb.connect();

app.listen(process.env.PORT, (err) => {
  if (err) console.err(err);
  console.info(`Server started on port ${process.env.PORT}`);
});
