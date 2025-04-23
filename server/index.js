require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userroute');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  }
});

mongoose.connect("mongodb://localhost:27017/elderPrivilege")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/user', userRoutes)
app.use('/api/chat', chatRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    socket.join(username);
    console.log(`${username} joined chat`);
  });

  socket.on('sendMessage', (messageData) => {
    const newMessage = {
      ...messageData,
      timestamp: new Date()
    };
    
    // Emit to both sender and receiver
    io.to(messageData.receiver).emit('newMessage', newMessage);
    io.to(messageData.sender).emit('newMessage', newMessage);
    
    // Save message to database (mock for now)
    console.log('New message:', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
