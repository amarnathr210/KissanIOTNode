/**
 * user mongo database model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const DeviceinfoSchema = new Schema({
  DeviceName: { type: String },
  DeviceBaseLines: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeviceBaseLine",
    required: true
  },
  DeviceUniqueID: { type: String },
  DeviceToken: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeviceToken",
    required: true
  },
  PinNO: { type: Number, default: 0 },
  SensorStatus: { type: Number, default: 0 },
  insertby: { type: String },
  insertdate: { type: Date, default: Date.now },
  updateby: { type: String },
  updatedate: { type: Date },
  deletedby: { type: String },
  deleteddate: { type: Date }
});

// DeviceinfoSchema.methods = {
//   save: function() {
//     if (!this.DeviceUniqueID) {
//       this.DeviceUniqueID = crypto.randomBytes(16).toString("hex");
//     }
//     return this.save();
//   }
// };

DeviceinfoSchema.pre("update", function(next) {
  this.updatedate = new Date();
  next();
});

DeviceinfoSchema.pre("save", function(next, done) {
  this.DeviceUniqueID = crypto.randomBytes(16).toString("hex");
  next();
});

module.exports = mongoose.model("Deviceinfo", DeviceinfoSchema);
