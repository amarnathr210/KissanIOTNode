/**
 * user mongo database model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const DeviceTokenSchema = new Schema({
  Token: { type: String },
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  GeneratedDate: { type: Date, default: Date.now },
  ExpiryDate: { type: Date, default: Date.now },
  LocationName: { type: String, required: true },
  insertby: { type: String },
  insertdate: { type: Date, default: Date.now },
  updateby: { type: String },
  updatedate: { type: Date },
  deletedby: { type: String },
  deleteddate: { type: Date }
});

// DeviceTokenSchema.methods = {
//   save: function() {
//     if (!this.DeviceUniqueID) {
//       this.DeviceUniqueID = crypto.randomBytes(16).toString("hex");
//     }
//     return this.save();
//   }
// };

DeviceTokenSchema.pre("update", function(next) {
  this.updatedate = new Date();
  next();
});

DeviceTokenSchema.pre("save", function(next, done) {
  // this.Token = crypto.randomBytes(16).toString("hex");
  this.Token = uuidv1();
  this.GeneratedDate = new Date();
  console.log(new Date().setFullYear(new Date().getFullYear() + 1));
  this.ExpiryDate = new Date().setFullYear(new Date().getFullYear() + 1);
  next();
});

module.exports = mongoose.model("DeviceToken", DeviceTokenSchema);
