const express = require("express");
const app = express();
const { projects } = require("./data.json");
const path = require("path");

//console.log({projects})
//console.log(projects)

// this enables body-parser object
// app.use(express.urlencoded({extended:false}));

// middleware
// set view engine to pug and provide path to views
// is this a way to set a fallback if needed?
//app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

// setup middleware to deliver static files
// https://expressjs.com/en/starter/static-files.html

// app.use(express.static('public'))
// opting to use static prefix instead of above
app.use("/static", express.static("public"));

// setup routes
app.get("/", (req, res) => {
  // render the pug template, pass pug the projects object
  // the second parameter enables pug to view the data object (declared in global variable)
  res.render("index", { projects });
});

// Add a route with route variables for project pages
app.get("/projects/:id", function (req, res, next) {
  const projectId = req.params.id;
  // render the pug project template
  res.render("project", { project: projects[projectId] });
});

app.get("/about", (req, res) => {
  res.render("./about");
});

// redirect on /projects with no id. If someone types in projects, they'll get
// the first project page instead of an error.
app.get("/projects", (req, res) => {
  res.redirect("/projects/0");
});

// ERROR HANDLING
app.use((req, res, next) => {
  console.log("404 error handler called");

  /* TODO 1: Send a response to the client
    - Set the response status to 404
    - Render the 'not-found' view
  */
  res.status(404).render("error");
});

/* Global error handler */
app.use((err, req, res, next) => {
  if (err) {
    console.log("Global error handler called", err);
  }
  /* TODO 2: Handle errors caught by your route handlers
    - If the error status is 404:
        * Set the response status to 404
        * Render the 'not-found' view and pass the error object to the view
    - Else:
        * Set the error message to the given message, or specify a general, 
          default error message
        * Set response status to the given error status OR, 
          set it to 500 by default if no error status is set
        * Render the 'error' view, passing it the error object
  */
          if (err.status === 404) {
            res.status(404).render("error", { err });
            console.log(err, 404);
          } else {
            console.log("bogus dude.");
            err.message = err.message || "Oops! It looks like something went wrong on the server.";
            res.status(err.status || 500).render("error", { err });
          }
        });

// PORT - Reference: Code with Mosh demo
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
