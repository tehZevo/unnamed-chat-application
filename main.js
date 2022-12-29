const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const PORT = 8080

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

//TODO: database
const channels = {
  "foo": {
    messages: []
  }
};

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// {
//   channel: string,
//   content: string,
//   attachments: [{name, data}, {name, data}, ...] or null,
// }
app.post('/create-message', (req, res) => {
  var {channel, content} = req.body;
  //TODO: validation (typescrypt) ;)
  var id = uuidv4()
  var message = {
    id, content
  }
  //store in "db"
  channels[channel].messages.push(message);
  //broadcast to connected clients
  io.emit("message", message);

  res.json("k");
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
