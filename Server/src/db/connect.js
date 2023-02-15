const mongoose = require("mongoose");
const { Schema } = mongoose;
const appConfig = require("../../config/app-config.json");
const connectionString = appConfig.uri;
module.exports = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
};
