const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// DB connection
mongoose
  .connect(
    "mongodb+srv://originalthinks:<@Transf2021>@cluster0.0zqad.mongodb.net/chat-database?retryWrites=true&w=majority"
  )
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));

// Settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);



// static files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
server.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});