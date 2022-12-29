const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const { Sequelize, DataTypes } = require("sequelize");
const buildModel = require("./model")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const {Channel, Message} = buildModel(sequelize);

const CHANNEL_ID = uuidv4()
const PORT = 8080

//TODO: lonely hardcoded channel
var channel;

//create a default channel
(async () => {
  await sequelize.sync()
  channel = await Channel.create({
    id: CHANNEL_ID
  });
})();

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

app.use(express.json());
app.use(cors());

// {
//   channel: string,
//   content: string,
//   attachments: [{name, data}, {name, data}, ...] or null,
// }
//TODO: express async?
app.post('/create-message', async (req, res) => {
  //TODO: validation (typescrypt) ;)
  var {content} = req.body; //TODO: get channelId

  //TODO: only broadcast necessary information
  const message = await channel.createMessage({
    id: uuidv4(),
    content
  });

  //broadcast to connected clients
  io.emit("message", message);

  res.json("OK");
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
