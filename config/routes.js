const company = require("../app/apis/values");
const device = require("../app/apis/device");
const ValidationMiddleware = require("../app/middlewares/auth.validation.middleware");
const Autherization = require("../app/controllers/autherization");
const VerifyUserMiddleware = require("../app/middlewares/verify.user.middleware");
bodyParser = require("body-parser");

module.exports = function(app) {
  /*body parser config*/
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: "application/json" }));
  /*body parser config*/
  app.post("/api/users/authenticate", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    Autherization.login
  ]);
  // app.post("/api/users/authenticate", function(req, res) {
  //   [
  //     VerifyUserMiddleware.hasAuthValidFields,
  //     VerifyUserMiddleware.isPasswordAndUserMatch,
  //     Autherization.login
  //   ];
  // });
  app.get("/api/load", [ValidationMiddleware.validJWTNeeded, company.load]);
  app.get("/api/insert", company.insertcompany);
  app.post("/api/adddevice", device.adddevice);
  // app.post("/api/adddevice", function(req, res) {
  //   device.adddevice;
  // });
  app.post("/api/adddevicebaseline", device.adddevicebaseline);
  // app.post("/api/adddevicebaseline", function(req, res) {
  //   device.adddevicebaseline;
  // });
  app.get("/api/device/getdeviceinfobydeviceid", [
    ValidationMiddleware.validJWTNeeded,
    device.getdeviceinfobydeviceid
  ]);
  app.get("/api/getdeviceinfobyuserid", device.getdeviceinfobyuserid);
  app.post("/api/User", device.insertUser);
  // app.post("/api/User", function(req, res) {
  //   device.insertUser;
  // });
  app.put("/api/User", device.modifyUser);
  app.post("/api/DeviceToken", [
    ValidationMiddleware.validJWTNeeded,
    device.adddevicetoken
  ]);
  // app.post("/api/DeviceToken", function(req, res) {
  //   [ValidationMiddleware.validJWTNeeded, device.adddevicetoken];
  // });
  app.post("/api/device/updatedevicestatus", [
    ValidationMiddleware.validJWTNeeded,
    device.updateDeviceStatus
  ]);
  // app.post("/api/device/updatedevicestatus", function(req, res) {
  //   [ValidationMiddleware.validJWTNeeded, device.updateDeviceStatus];
  // });
  app.get("/api/iot/AuthenticateDevice", [
    device.AuthenticateDevice,
    Autherization.deviceauthentication
  ]);
  app.get("/api/iot/GetDeviceStatus", [
    ValidationMiddleware.DevicevalidJWTNeeded,
    device.GetDeviceStatus
  ]);
};
