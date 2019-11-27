/**
 * user mongo database model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function toLower(d) {
  return d.toLowerCase();
}
const UserSchema = new Schema({
  FirstName: { type: String },
  LastName: { type: String },
  LoginUserName: { type: String },
  Password: { type: String },
  emailID: { type: String },
  phoneno: { type: String },
  insertedby: { type: String },
  insertdate: { type: Date, default: Date.now },
  updateby: { type: String },
  updatedate: { type: Date },
  deletedby: { type: String },
  deleteddate: { type: Date }
});
UserSchema.set("toJSON", {
  virtuals: true
});

UserSchema.pre("updateOne", function(next) {
  // console.log(this.getUpdate());
  this.update({ updatedate: new Date() });
  next();
});

module.exports = mongoose.model("User", UserSchema);
