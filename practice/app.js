const express = require("express");
const app = express();

// app.use((req, res, next) => {
//   console.log("middleware is running");
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//HTTP request GET POST PUT DELETE
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:name", (req, res) => {
  let { name } = req.params;
  res.render("index", { name });
});

app.get("/send", (req, res) => {
  res.send("welcome to another page");
});

app.get("/sendFileExample", (req, res) => {
  res.sendFile(__dirname + "/example.html");
});
app.get("/jsonExample", (req, res) => {
  let obj = {
    title: "Web Design",
    website: "udemy",
  };
  res.json(obj);
});
app.get("/redirectExample", (req, res) => {
  res.redirect("/sendFileExample");
});

app.get("/fruit", (req, res) => {
  res.send("<h1>Welcome to the Fruit Web</h1>");
});

app.get("/fruit/:someFruit", (req, res) => {
  res.send("<h1>Welcome to the" + req.params.someFruit + " Web</h1>");
});

app.post("/formHandling", (req, res) => {
  console.log(req.body);
  // res.send(
  //   "Server is got your data. your data is Name:" +
  //     req.query.name +
  //     req.query.age +
  //     " age"
  // );
});

app.get("*", (req, res) => {
  res.status(404).send("<h1>404 page not found</h1>");
});
//  port callback
app.listen(3000, () => {
  console.log("Server is listening port 3000....");
});
