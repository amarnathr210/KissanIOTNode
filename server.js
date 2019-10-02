/*adding the env variables to configurations*/
require("dotenv").config();

const fs = require("fs");
const join = require("path").join;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const models = join(__dirname, "app/models");
const config = require("./config");

const port = process.env.PORT || 4000;
/**
 * Expose
 */

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

require("./config/express")(app);
require("./config/routes")(app);
connect();

function listen() {
  //   if (app.get("env") === "test") return;
  app.listen(port);
  console.log("Express app started on port " + port);
}
function mongoErrors(error) {
  console.log(error);
}

function connect() {
  console.log(config.db);
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", listen);
  return mongoose.connect(config.db, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
require("./app/models/company");
