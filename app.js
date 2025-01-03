/** Express app for Lunchly. */

import express from "express";
import pkg from "nunjucks";
import { urlencoded } from "express";
import routes from "./routes.js";

const app = express();
const { configure } = pkg;

// Parse body for urlencoded (non-JSON) data
app.use(urlencoded({ extended: false }));

configure("templates", {
  autoescape: true,
  express: app,
});

app.use(routes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.render("error.html", { err });
});

export default app;
