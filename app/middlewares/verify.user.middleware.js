// const UserModel = require("../../users/models/users.model");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const { wrap: async } = require("co");

exports.hasAuthValidFields = (req, res, next) => {
  let errors = [];
  if (req.body) {
    if (!req.body.username) {
      errors.push("Missing email field");
    }
    if (!req.body.password) {
      errors.push("Missing password field");
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(",") });
    } else {
      return next();
    }
  } else {
    return res
      .status(400)
      .send({ errors: "Missing email and password fields" });
  }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
  /*UserModel.findByEmail(req.body.email).then(user => {
    if (!user[0]) {
      res.status(404).send({});
    } else {
      let passwordFields = user[0].password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevel: user[0].permissionLevel,
          provider: "email",
          name: user[0].firstName + " " + user[0].lastName
        };
        return next();
      } else {
        return res.status(400).send({ errors: ["Invalid e-mail or password"] });
      }
    }
  });*/

  User.findOne({ LoginUserName: req.body.username }, {}).then(user => {
    if (user == null) {
      res.status(404).send({});
    } else {
      if (req.body.password === user.Password) {
        req.body = {
          userId: user.LoginUserName,
          email: user.email,
          // permissionLevel: user.permissionLevel,
          provider: "email",
          name: user.FirstName + " " + user.LastName,
          loginusername: user.FirstName + " " + user.LastName
        };
        return next();
      } else {
        return res.status(400).send({ errors: ["Invalid e-mail or password"] });
      }
    }
  });
};
