class IoTConsumer {
  client;

  constructor(client) {
    this.client = client;
  }

  subscribe(channel, callback) {
    this.client.subscribe(channel, callback);
  }

  unsubscribe(channel) {
    this.client.unsubscribe(channel);
  }
}

module.exports = IoTConsumer;
