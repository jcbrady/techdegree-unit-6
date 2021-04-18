const express = require("express");
const app = express();
const pug = require("pug");
const path = require("path");

// view engine pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
  //res.send("Hello world.");
});

app.get("/about", (req, res) => {
  res.render("./about");
});

// PORT - Reference: Code with Mosh demo
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
