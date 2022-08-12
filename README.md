# node-iot-lib

Node.js library for IoT projects

## Usage

### Backend Server

```javascript
const PORT = 5000;

const { createClient } = require("redis");
const redisClient = createClient();
redisClient.on("connect", () => console.log("redis client connect"));
redisClient.connect();

const { Server } = require("socket.io");
const socketServer = new Server({ cors: { origin: true } });

const { IoTServer } = require("node-iot-lib");
const ioTServer = new IoTServer(redisClient, socketServer);

const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);

ioTServer.attach(httpServer);

httpServer.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});

// [...]
```

### Producer Server

```javascript
const { createClient } = require("redis");
const redisClient = createClient();
redisClient.on("connect", () => console.log("redis client connect"));
redisClient.connect();

const { IoTProducer } = require("node-iot-lib");
const producer = new IoTProducer(redisClient);

// [...]
```

Then

```javascript
producer.publish("hello", "world"));
// or
producer.publish("hello", JSON.stringify({ message: "world" }));
```

### Consumer Server

```javascript
const { createClient } = require("redis");
const redisClient = createClient();
redisClient.on("connect", () => console.log("redis client connect"));
redisClient.connect();

const { IoTConsumer } = require("node-iot-lib");
const consumer = new IoTConsumer(redisClient);

// [...]
```

## How it works

### Client Side

[...]

### Server Side

Set of subscribed channels:

```json
["channelA", "channelB"]
```

Set of clients in map of subscribed channels:

```json
{
  "channelA": ["clientA", "clientB"],
  "channelB": ["clientA", "clientB"]
}
```

When a client subscribe to a channel

- Add channel to Set of subscribed channels.
- Add client to Set of clients in map of subscribed channels.
