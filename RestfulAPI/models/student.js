const mongoose = require("mongoose");

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
  },
  age: {
    type: Number,
    default: 18,
    min: 18,
    max: [80, "Maybe too old。。。"],
  },
  major: { type: String },
  scholarship: {
    merit: {
      type: Number,
      min: 0,
      max: [5000, "Student's merit scholarship is too much."],
    },
    other: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
