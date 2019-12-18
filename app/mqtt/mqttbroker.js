var mqtt = require("mqtt"),
  url = require("url");
const config = require("../../config");

var mqtt_url = url.parse(config.CLOUDAMQP_MQTT_URL);

var url = "mqtt://" + mqtt_url.host;

var options = {
  port: mqtt_url.port,
  clientId: config.CLOUDAMQP_MQTT_ClientID,
  username: config.CLOUDAMQP_MQTT_UserName,
  password: config.CLOUDAMQP_MQTT_Password
};

/*this method is to publish the message to to the topic */
exports.PublishMqttMessage = function(topic, message) {
  try {
    // console.log(topic + ":" + message);
    var client = mqtt.connect(url, options);
    client.on("connect", function() {
      console.log(topic + ":" + message.toString());
      client.publish(topic, message.toString(), function() {
        // console.log("Enter publish:" + topic + ":" + message);
        client.end();
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
/*this method is to subscribe the topic to get the messages */
exports.subscribeMessage = function(topic) {
  var client = mqtt.connect(url, options);
  client.subscribe(topic, function() {
    // when a message arrives, do something with it
    client.on(topic, function(topic, message, packet) {
      //   console.log("Received '" + message + "' on '" + topic + "'");
      return message;
    });
  });
};
