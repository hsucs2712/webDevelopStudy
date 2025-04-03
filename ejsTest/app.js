const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/example", (req, res) => {
  let { name, age } = req.query;
  res.render("response", { name, age });
});
app.listen(3000, () => {
  console.log("server running。。。");
});
