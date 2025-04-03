const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://127.0.0.1:27017/exampleDB")
  .then(() => {
    console.log("成功連接mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const studentSchema = new Schema({
  name: { type: String, maxlangth: 30 },
  age: { type: Number, min: [0, "年齡不可小於0"] },
  major: {
    type: String,
    enum: [
      "Mathematics",
      "Computer Science",
      "Chemistry",
      "Civil Engineering",
      "undecided",
    ],
  },
  scholarchip: {
    merit: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },
});
studentSchema.statics.findAllMajorStudents = function (major) {
  return this.find({ major: major }).exec();
};
studentSchema.methods.printTotalScholarchip = function () {
  return this.scholarchip.merit + this.scholarchip.other;
};
const Student = mongoose.model("Student", studentSchema);

// Student.updateOne({ name: "Esther Lam" }, { age: -5 })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

Student.find({})
  .exec()
  .then((data) => {
    data.forEach((Student) => {
      console.log(Student.name + "獎金: " + Student.printTotalScholarchip());
    });
  })
  .catch((e) => {
    console.log(e);
  });

Student.findAllMajorStudents("Computer Science")
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });
// Student.deleteOne({ name: "Andy" })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// async function findStudent(){
//   try{
//     let data = await Student.find().exec()
//   console.log(data)
//   } catch (e){
//     console.log(e)
//   }
// }

// app.get("/", async (req, res) => {
//   try {
//     let data = await Student.findOne({ name: "Esther" }).exec();
//     res.send(data);
//   } catch (e) {
//     console.log(e);
//   }
// });

// Student.find({})
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// const newObject = new Student({
//   name: "Esther",
//   age: 27,
//   major: "Mathematics",
//   scholarchip: {
//     merit: 6000,
//     other: 7000,
//   },
// });
// newObject
//   .save()
//   .then((saveObject) => {
//     console.log("資料已儲存完畢:");
//     console.log(saveObject);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.listen(3000, () => {
  console.log("port is running");
});
