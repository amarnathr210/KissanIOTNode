module.exports = {
  db: process.env.MONGODB_URL || "mongodb://localhost/kissaniot",
  jwt_secret: process.env.jwt_secret
};
