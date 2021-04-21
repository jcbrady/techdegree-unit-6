const express = require("express");
const app = express();
const { projects } = require("./data.json");
const path = require("path");

//console.log(projects)

// middleware
// set view engine to pug and provide path to views
// set fallback if needed
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// setup middlewar to deliver static files
app.use("/static", express.static("public"));

// setup routes
app.get("/", (req, res) => {
  //console.log(projects)
  res.render("index", {projects});
});

// app.get("projects/:id", function (req, res, next) {
//   const projectId = req.params.id;
//   console.log(projectId)

// });

app.get("/about", (req, res) => {
  res.render("./about");
});

// PORT - Reference: Code with Mosh demo
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
