/**
 * user mongo database model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceBaseLineSchema = new Schema({
  DeviceTypeName: { type: String },
  insertby: { type: String },
  insertdate: { type: Date, default: Date.now },
  updateby: { type: String },
  updatedate: { type: Date },
  deletedby: { type: String },
  deleteddate: { type: Date }
});
DeviceBaseLineSchema.pre("update", function(next) {
  this.updatedate = new Date();
  next();
});

module.exports = mongoose.model("DeviceBaseLine", DeviceBaseLineSchema);
