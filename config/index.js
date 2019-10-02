const development = require("./env/development");

module.exports = { development: development }[
  process.env.NODE_ENV || "development"
];
