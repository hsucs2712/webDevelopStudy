const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    // return res.send(studentData);
    return res.render("student", { studentData });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/add", async (req, res) => {
  return res.render("add-student");
});

router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    console.log(foundStudent);
    if (foundStudent != null) {
      return res.render("student-page", { foundStudent });
    } else {
      return res.render("error");
    }
    // return res.send(foundStudent);
  } catch (e) {
    // return res.status(400).send(e.message);
    return res.render("error");
  }
});

router.get("/:_id/edit", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    console.log(foundStudent);
    if (foundStudent != null) {
      return res.render("edit-student", { foundStudent });
    } else {
      return res.render("error");
    }
    // return res.send(foundStudent);
  } catch (e) {
    // return res.status(400).send(e.message);
    return res.render("error");
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    let newStudent = new Student({
      name,
      age,
      major,
      scholarship: { merit, other },
    });
    let savedStudnet = await newStudent.save("儲存成功");
    // return res.send({ msg: "Created succeeded", savedObject: savedStudnet });
    // return res.render("add-student");
    let studentData = await Student.find({}).exec();
    return res.render("student", { studentData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.put("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, major, merit, other } = req.body;

    let newData = await Student.findOneAndUpdate(
      { _id },
      { name, age, major, merit, other },
      { new: true, runValidators: true, overwrite: true }
    );
    return res.send({ msg: "succeeded update", updataData: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

class NewData {
  constructor() {}
  setProperty(key, value) {
    if (key !== "merit" && key !== "other") {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}
router.patch("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let newObject = new NewData();
    for (let property in req.body) {
      newObject.setProperty(property, req.body[property]);
    }

    let newData = await Student.findByIdAndUpdate({ _id }, newObject, {
      new: true,
      runValidators: true,
    });
    return res.send({ msg: "succeeded update", updataData: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deletedata = await Student.deleteOne({ _id });
    return res.send(deletedata);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
