const mongoose = require("mongoose");
const { wrap: async } = require("co");
const Company = mongoose.model("Company");
// const Deviceinfo = mongoose.model("Deviceinfo");
// const Devicebaseline = mongoose.model("DeviceBaseLine");
// const User = mongoose.model("User");
// const crypto = require("crypto");

exports.load = async(function*(req, res, next, id) {
  try {
    id = "5cb1d0f4897a63114cde87d5";
    req.Company = yield Company.load(id);
    console.log(req.Company);
    if (!req.Company) return next(new Error("company not found"));
    // res = req.Company;
    res.send(req.Company).status(200);
  } catch (err) {
    return next(err);
  }
  next();
});

exports.insertcompany = async(function*(req, res, next, id) {
  try {
    var Companyobj = new Company({
      IndustryID: "1",
      ComapnyID: 1,
      description: "testdata2",
      weburl: "www.google.com",
      CompanyTitle: "test",
      name: "wi-pro",
      logopath: "images/CSC1.png",
      companyclass: "bar-item button item",
      logoclass: "img-circle",
      comments: [
        {
          body: "test"
        }
      ],
      image: [{ cdnUri: "test" }]
    });
    var Companyobj1 = yield Companyobj.save();
    console.log(Companyobj1);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  next();
});
