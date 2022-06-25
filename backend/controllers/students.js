const Student = require("../models/Student");

// Get all Students
exports.getStudents = async (req, res, next) => {
  try {
    let query = Student.find(req.query);
    // Pagination
    const page = req.query.page * 1 || 0;
    const limit = req.query.limit * 1 || (await Student.find().count());
    const skip = page * limit;
    const pageCount = Math.ceil((await Student.find().count()) / limit);
    query = query.skip(skip).limit(limit);
    query = students = await query;
    res.status(200).json({ count: students.length, pageCount, data: students });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
