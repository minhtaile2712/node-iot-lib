class IoTProducer {
  client;

  constructor(client) {
    this.client = client;
  }

  publish(channel, message) {
    this.client.publish(channel, message);
  }
}

module.exports = IoTProducer;
