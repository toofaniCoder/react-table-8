const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  email: String,
  phone: { 1: String, 2: String },
  age: Number,
  date_of_birth: String,
  date_of_admission: String,
  address: {
    pincode: String,
    city: String,
    street: String,
    state: String,
  },
  firstName: String,
  middleName: String,
  lastName: String,
});

module.exports = mongoose.model("Student", StudentSchema);
