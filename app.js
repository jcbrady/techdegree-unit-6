const express = require("express");
const app = express();
const { projects } = require("./data.json");
const path = require("path");

// MIDDLEWARE
// set view engine to pug and provide path to views
app.set("view engine", "pug");

// Serve static files with static prefix
app.use("/static", express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  // render the pug template, pass pug the projects object
  // the second parameter enables pug to view the data object 
  res.render("index", { projects });
});

// Route parameters for local variables on project pages
app.get("/projects/:id", function (req, res, next) {
  const projectId = req.params.id;
  // render the pug project template
  res.render("project", { project: projects[projectId] });
});

app.get("/about", (req, res) => {
  res.render("./about");
});

// redirect on /projects with no id. If someone types in projects, they'll land on the first project page.
app.get("/projects", (req, res) => {
  res.redirect("/projects/0");
});

// ERROR HANDLING
app.use((req, res, next) => {
  console.log("404 error handler called");
  res.status(404).render("page-not-found");
  //next();
});

/* Global error handler */
app.use((err, req, res, next) => {
  if (err) {
    console.log("Global error handler called", err);
  }

  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
    console.log(err, 404);
  } else {
    console.log("Whoops, there was an error.");
    err.message = err.message || "Oops! It looks like something went wrong on the server.";
    res.status(err.status || 500).render("error", { err });
  }
});

// PORT - To run on a remote server 
// Reference: Code with Mosh demo
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
