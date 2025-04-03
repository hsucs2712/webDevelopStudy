const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const studentRouter = require("./routes/students-routes");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/students", studentRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/exampleDB")
  .then(() => {
    console.log("mongoDB is connection succeeded");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("running...");
});
