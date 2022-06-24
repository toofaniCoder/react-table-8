const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDatabase = require("./config/database");
dotenv.config({ path: __dirname + "/config/config.env" });
const path = require("path");

connectDatabase();

const students = require("./routes/students");

const app = express();

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

app.use(express.static("uploads"));
app.use("/api/v1/students", students);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running at port: ${PORT}`)
);
