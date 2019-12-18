module.exports = {
  db: process.env.MONGODB_URL || "mongodb://localhost/kissaniot",
  jwt_secret: process.env.jwt_secret,
  CLOUDAMQP_MQTT_URL: process.env.CLOUDAMQP_MQTT_URL,
  CLOUDAMQP_MQTT_ClientID: process.env.CLOUDAMQP_MQTT_ClientID,
  CLOUDAMQP_MQTT_UserName: process.env.CLOUDAMQP_MQTT_UserName,
  CLOUDAMQP_MQTT_Password: process.env.CLOUDAMQP_MQTT_Password
};
