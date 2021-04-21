const express = require("express");
const app = express();
const { projects } = require("./data.json");
const path = require("path");

//console.log({projects})
//console.log(projects)

// enables body-parser object
// app.use(express.urlencoded({extended:false}));

// middleware
// set view engine to pug and provide path to views
// set fallback if needed
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// setup middleware to deliver static files
app.use("/static", express.static("public"));

// setup routes
app.get("/", (req, res) => {
  // render the pug template, pass pug the projects object
  // the second parameter enables pug to view the data object (declared in global variable)
  res.render("index", {projects});
  // res.render("index");
});
// Does the above rendered pug template call this route?
app.get("projects/:id", function (req, res, next) {
  //const projectId = req.params.id;
  //console.log(projectId)
  console.log("projects/:id route called.")
});

app.get("/about", (req, res) => {
  res.render("./about");
});

// PORT - Reference: Code with Mosh demo
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
