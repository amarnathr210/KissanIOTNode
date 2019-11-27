// const jwtSecret = require("../../common/config/env.config.js").jwt_secret,
require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtSecret = require("../../config").jwt_secret;

exports.login = (req, res) => {
  try {
    console.log("jwtSecret:" + jwtSecret);
    let refreshId = req.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = new Buffer(hash);
    let refresh_token = b.toString("base64");
    req.body.token = token;
    req.body.refreshToken = refresh_token;
    // res.status(201).send({ accessToken: token, refreshToken: refresh_token });
    res.status(201).send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: err });
  }
};

exports.refresh_token = (req, res) => {
  try {
    req.body = req.jwt;
    let token = jwt.sign(req.body, jwtSecret);
    res.status(201).send({ id: token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
exports.deviceauthentication = (req, res) => {
  try {
    let refreshId = req.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = new Buffer(hash);
    let refresh_token = b.toString("base64");
    req.body.token = token;
    req.body.refreshToken = refresh_token;
    res.status(201).send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: err });
  }
};
