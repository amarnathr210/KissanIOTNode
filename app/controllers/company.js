// "use strict";

// /**
//  * Module dependencies.
//  */

// const mongoose = require("mongoose");
// // const notify = require("../mailer");

// const Schema = mongoose.Schema;

// /*const getTags = tags => tags.join(",");
// const setTags = tags => tags.split(",").slice(0, 10); // max tags
// */
// /**
//  * Company Schema
//  */

// const CompanySchema = new Schema({
//   IndustryID: { type: Number },
//   CompayID: { type: Number, default: 0 },
//   description: { type: String, alias: "att_company_description" },
//   weburl: { type: String, alias: "att_company_weburl" },
//   CompanyTitle: { type: String },
//   name: { type: String, alias: "att_company_name" },
//   insertedby: { type: String },
//   insertdate: { type: Date, default: Date.now },
//   updateby: { type: String },
//   updatedate: { type: Date },
//   deletedby: { type: String },
//   deleteddate: { type: Date },
//   logopath: { type: String, alias: "att_logo_i_path" },
//   companyclass: { type: String, alias: "att_company_a_class" },
//   logoclass: { type: String, alias: "att_logo_i_class" },

//   /*title: { type: String, default: "", trim: true, maxlength: 400 },
//   body: { type: String, default: "", trim: true, maxlength: 1000 },
//   user: { type: Schema.ObjectId, ref: "User" },*/
//   comments: [
//     {
//       body: { type: String, default: "", maxlength: 1000 },
//       /*user: { type: Schema.ObjectId, ref: "User" },*/
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],
//   image: {
//     cdnUri: String,
//     files: []
//   }
// });

// /**
//  * Validations
//  */
// /*
// CompanySchema.path("title").required(true, "Company title cannot be blank");
// CompanySchema.path("body").required(true, "Company body cannot be blank");
// */

// /**
//  * Pre-remove hook
//  */

// CompanySchema.pre("remove", function(next) {
//   // const imager = new Imager(imagerConfig, 'S3');
//   // const files = this.image.files;

//   // if there are files associated with the item, remove from the cloud too
//   // imager.remove(files, function (err) {
//   //   if (err) return next(err);
//   // }, 'Company');

//   next();
// });

// /**
//  * Methods
//  */

// CompanySchema.methods = {
//   /**
//    * Save Company and upload image
//    *
//    * @param {Object} images
//    * @api private
//    */

//   uploadAndSave: function(/*image*/) {
//     const err = this.validateSync();
//     if (err && err.toString()) throw new Error(err.toString());
//     return this.save();

//     /*
//     if (images && !images.length) return this.save();
//     const imager = new Imager(imagerConfig, 'S3');

//     imager.upload(images, function (err, cdnUri, files) {
//       if (err) return cb(err);
//       if (files.length) {
//         self.image = { cdnUri : cdnUri, files : files };
//       }
//       self.save(cb);
//     }, 'company');
//     */
//   },

//   /**
//    * Add comment
//    *
//    * @param {User} user
//    * @param {Object} comment
//    * @api private
//    */

//   addComment: function(user, comment) {
//     this.comments.push({
//       body: comment.body,
//       user: user._id
//     });

//     if (!this.user.email) this.user.email = "email@product.com";

//     // notify.comment({
//     //   company: this,
//     //   currentUser: user,
//     //   comment: comment.body
//     // });

//     return this.save();
//   },

//   /**
//    * Remove comment
//    *
//    * @param {commentId} String
//    * @api private
//    */

//   removeComment: function(commentId) {
//     const index = this.comments.map(comment => comment.id).indexOf(commentId);

//     if (~index) this.comments.splice(index, 1);
//     else throw new Error("Comment not found");
//     return this.save();
//   }
// };

// /**
//  * Statics
//  */

// CompanySchema.statics = {
//   /**
//    * Find company by id
//    *
//    * @param {ObjectId} id
//    * @api private
//    */

//   load: function(_id) {
//     return this.findOne({ _id })
//       .populate("user", "name email username")
//       .populate("comments.user")
//       .exec();
//   },

//   /**
//    * List companys
//    *
//    * @param {Object} options
//    * @api private
//    */

//   list: function(options) {
//     const criteria = options.criteria || {};
//     const page = options.page || 0;
//     const limit = options.limit || 30;
//     return this.find(criteria)
//       .populate("user", "name username")
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .skip(limit * page)
//       .exec();
//   }
// };

// module.exports = mongoose.model("Company", CompanySchema);
