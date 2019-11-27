const mongoose = require("mongoose");
const { wrap: async } = require("co");
const Deviceinfo = mongoose.model("Deviceinfo");
const Devicebaseline = mongoose.model("DeviceBaseLine");
const User = mongoose.model("User");
const DeviceToken = mongoose.model("DeviceToken");
const crypto = require("crypto");

exports.insertUser = async(function*(req, res, next) {
  try {
    var ObjUser = new User(req.body);
    ObjUser = yield ObjUser.save();
    // console.log(req.body);
    res.send(ObjUser).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});

exports.modifyUser = async(function*(req, res, next) {
  try {
    var ObjUser = new User(req.body);
    ObjUser = yield User.updateOne(
      {
        LoginUserName: ObjUser.LoginUserName
      },
      {
        FirstName: ObjUser.FirstName,
        LastName: ObjUser.LastName,
        emailID: ObjUser.emailID,
        phoneno: ObjUser.phoneno
      }
    );
    res.send(ObjUser).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});
/*this method is to add the device based on the loginname,typeof device,location associated to the user */
exports.adddevice = async(function*(req, res, next) {
  try {
    var Deviceinfoobj = new Deviceinfo();
    console.log(req.body);
    var objUser = yield User.findOne({}, { LoginUserName: req.body.User });
    var objDeviceBaseline = yield Devicebaseline.findOne({
      DeviceTypeName: req.body.DeviceBaseLines
    });
    var objDeviceToken = yield DeviceToken.findOne({
      User: objUser._id,
      LocationName: req.body.Location
    });
    Deviceinfoobj.User = objUser;
    Deviceinfoobj.DeviceToken = objDeviceToken;
    Deviceinfoobj.DeviceBaseLines = objDeviceBaseline;
    Deviceinfoobj.DeviceName = req.body.DeviceName;
    Deviceinfoobj = yield Deviceinfoobj.save();
    res.send(Deviceinfoobj).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});
exports.adddevicetoken = async(function*(req, res, next) {
  try {
    var DeviceTokenobj = new DeviceToken(req.body);
    var objUser = yield User.findOne(
      {},
      { LoginUserName: req.body.LoginUserName }
    );
    DeviceTokenobj.User = objUser;
    console.log(DeviceTokenobj);
    DeviceTokenobj = yield DeviceTokenobj.save();
    res.send(DeviceTokenobj).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});

exports.adddevicebaseline = async(function*(req, res, next) {
  try {
    var Devicebaselineobj = new Devicebaseline(req.body);
    Devicebaselineobj = yield Devicebaselineobj.save();
    res.send(Devicebaselineobj).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});

exports.getdeviceinfobyuserid = async(function*(req, res, next) {
  try {
    const User = new User(req.body);
    var Deviceinfoobj = yield Deviceinfoobj.find(User);
    res.send(Deviceinfoobj).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});
/*this is to get the array of deviceinfo objects with loginusername associates */
exports.getdeviceinfobydeviceid = async(function*(req, res, next) {
  try {
    var objUser = yield User.findOne({}, { LoginUserName: req.jwt.userId });
    var objDeviceToken = yield DeviceToken.find({
      User: objUser._id
    });
    var ids = objDeviceToken.map(function(m) {
      return m._id;
    });

    var obj = yield DeviceToken.aggregate([
      {
        $lookup: {
          from: "deviceinfos",
          localField: "_id",
          foreignField: "DeviceToken",
          as: "name"
        }
      },
      { $match: { _id: { $in: ids } } }
    ]);

    // var objDeviceinfo = yield Deviceinfo.find({
    //   DeviceToken: { $in: ids }
    // })
    //   .populate({
    //     path: "DeviceToken",
    //     select: {
    //       insertby: 0,
    //       GeneratedDate: 0,
    //       ExpiryDate: 0,
    //       insertdate: 0
    //     },
    //     populate: { path: "User" }
    //   })
    //   .exec();
    res.send(obj).status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});
/*updating the device status from the web site or mobile with deviceUniqueID */
exports.updateDeviceStatus = async(function*(req, res, next) {
  try {
    yield Deviceinfo.updateOne(
      {
        DeviceUniqueID: req.body.DeviceUniqueID
      },
      { SensorStatus: req.body.SensorStatus },
      function(err, affected, resp) {
        console.log(affected);
      }
    );
    res.status(200);
  } catch (error) {
    console.log(error);
    return next();
  }
});

/*embbeded device code */
exports.AuthenticateDevice = async(function*(req, res, next) {
  try {
    var objDeviceToken = yield DeviceToken.findOne({
      DeviceToken: req.body.deviceToken
    }).populate({ path: "User" });

    req.body.userId = objDeviceToken.User.LoginUserName;
    // res.status(200).send(objDeviceToken);
    return next();
  } catch (error) {
    console.log(error);
    return next();
  }
});

exports.GetDeviceStatus = async(function*(req, res, next) {
  try {
    var objDeviceToken = yield DeviceToken.findOne({
      Token: req.query.DeviceToken
    }).populate({ path: "User" });

    var objDeviceinfo = yield Deviceinfo.findOne({
      DeviceToken: objDeviceToken._id
    });
    req.body.userId = objDeviceToken.User.LoginUserName;
    res.status(200).send(objDeviceinfo);
  } catch (error) {
    console.log(error);
    return next();
  }
});
