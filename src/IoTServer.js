const IoTConsumer = require("./IoTConsumer");

class IoTServer {
  server;
  consumer;
  subscribedChannels;

  constructor(redisClient, socketServer) {
    let server = socketServer;
    let consumer = new IoTConsumer(redisClient);
    let subscribedChannels = new Set();

    let publishCb = (message, channel) => {
      server.in(channel).emit("message", message, channel); // !!!
    };

    server.on("connection", (client) => {
      client.on("subscribe", (channel) => {
        if (!subscribedChannels.has(channel)) {
          subscribedChannels.add(channel);
        }

        client.join(channel);
      });

      client.on("unsubscribe", (channel) => {
        client.leave(channel);
      });
    });

    server.of("/").adapter.on("create-room", (channel) => {
      if (subscribedChannels.has(channel)) {
        consumer.subscribe(channel, publishCb);
      }
    });

    server.of("/").adapter.on("delete-room", (channel) => {
      if (subscribedChannels.has(channel)) {
        consumer.unsubscribe(channel, publishCb);
        subscribedChannels.delete(channel);
      }
    });

    this.consumer = consumer;
    this.subscribedChannels = subscribedChannels;
    this.server = server;
  }

  attach(httpServer) {
    this.server.attach(httpServer);
  }
}

module.exports = IoTServer;
