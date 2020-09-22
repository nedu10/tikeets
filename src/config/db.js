const mongoose = require("mongoose");
// const { mongoUri } = require("./config");

module.exports = {
  connect: () => {
    try {
      mongoose.connect(
        process.env.NODE_ENV == "test"
          ? process.env.MONGO_TEST_URI
          : process.env.MONGO_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      );
      console.log("Connected to the database!!!");
    } catch (error) {
      throw error;
    }
  },
  disconnect: (done) => mongoose.disconnect(done),
};
