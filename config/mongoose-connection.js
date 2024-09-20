const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGO_URI || 3000; // what does this mean
mongoose.connect(mongoUri);
const database = mongoose.connection;
database.on("connected", function () {
  console.log("Database server has been connected");
});
database.on("disconnected", function () {
  console.log("Database server has been disconnected");
});
database.on("error", function (error) {
  console.log("Error while connecting to the database:", error);
});

module.exports = database;
