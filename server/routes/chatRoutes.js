const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Mock messages for testing
const mockMessages = [
  {
    sender: "user1",
    receiver: "68015c1c5f5f2a66891ef766",
    content: "Hello! How are you?",
    timestamp: new Date(),
  },
  {
    sender: "68015c1c5f5f2a66891ef766",
    receiver: "user1",
    content: "I'm doing great, thanks!",
    timestamp: new Date(),
  }
];

// Get chat messages for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // For testing, return mock messages
    res.json(mockMessages);
    
    // TODO: Uncomment below code when ready to use database
    /*
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
    */
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Save new message
router.post('/', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Message({
      sender,
      receiver,
      content,
      timestamp: new Date()
    });
    
    // For testing, just log the message
    console.log('New message:', newMessage);
    res.status(201).json(newMessage);
    
    // TODO: Uncomment below code when ready to use database
    /*
    await newMessage.save();
    res.status(201).json(newMessage);
    */
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Error saving message' });
  }
});

module.exports = router;