module.exports = {
  db: process.env.MONGODB_URL || "mongodb://localhost/noobjs_poc",
  jwt_secret: process.env.jwt_secret
};
