/**
 * user mongo database model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const DeviceArchiveSchema = new Schema({
  DeviceID: { type: mongoose.Schema.Types.ObjectId, ref: "Deviceinfo" },
  insertby: { type: String },
  insertdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DeviceArchive", DeviceArchiveSchema);
