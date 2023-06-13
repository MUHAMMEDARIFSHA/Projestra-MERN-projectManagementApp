const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.MONGO_URL;

mongoose
  .connect(dbUrl, {})
  .then(() => {
    console.log(`Connected to MongoDB `);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
