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

  pSubscribe(pattern, callback) {
    this.client.pSubscribe(pattern, callback);
  }

  pUnsubscribe(pattern) {
    this.client.pUnsubscribe(pattern);
  }
}

module.exports = IoTConsumer;
