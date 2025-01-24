// server.js (Backend Code)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500", // Allow frontend to connect from this address
        methods: ["GET", "POST"],
    }
});


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  // Sync music playback
  socket.on('musicControl', (action) => {
    io.emit('musicControl', action);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* Directory structure:
project-folder/
├── public/
│   ├── index.html
│   ├── style.css
│   ├── app.js
└── server.js
*/
