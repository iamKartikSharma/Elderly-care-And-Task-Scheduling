import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import Navbar from './navbar';

const socket = io('http://localhost:8000');

const Chat = ({ username, userType }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    // Fetch available users based on userType
    const fetchUsers = async () => {
      try {
        const userEndpoint = userType === 'Family' ? '/user/Elder' : '/user/family';
        const response = await axios.get(`http://localhost:8000${userEndpoint}`);
        setAvailableUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [userType]);

  useEffect(() => {
    if (!selectedUser) return;

    socket.emit('join', username);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chat/${selectedUser._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [username, selectedUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && selectedUser) {
      const messageData = {
        sender: username,
        receiver: selectedUser._id,
        content: inputMessage
      };

      socket.emit('sendMessage', messageData);
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} userType={userType} />
      
      <div className="p-4">
        <div className="mb-4">
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setSelectedUser(availableUsers.find(user => user._id === e.target.value))}
            value={selectedUser?._id || ''}
          >
            <option value="">Select a user to chat with</option>
            {availableUsers.map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {selectedUser ? (
          <div className="chat-container">
            <div className="chat-header">
              <h3>Chat with {selectedUser.name}</h3>
            </div>
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === username ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    {msg.content}
                  </div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="message-input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center p-4">
            Please select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;