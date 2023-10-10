import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('/');

function Message() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchUserList();

    socket.on('new-message', (data) => {
      if (selectedUser && data.sender_id === selectedUser.id) {
        setMessages([...messages, data]);
      } else {
        setUserList((prevUsers) =>
          prevUsers.map((user) =>
            user.id === data.sender_id
              ? { ...user, unreadMessages: user.unreadMessages + 1 }
              : user
          )
        );
      }
    });

    return () => {
      socket.off('new-message');
    };
  }, [selectedUser, messages]);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('/api/users'); 
      setUserList(response.data);
    } catch (error) {
      console.error('Failed to fetch user list', error);
    }
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    setUserList((prevUsers) =>
      prevUsers.map((u) => (u.id === user.id ? { ...u, unreadMessages: 0 } : u))
    );

    try {
      const response = await axios.get(`/api/messages?sender_id=${user.id}`); 
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch message history', error);
    }
  };

  const sendMessage = () => {
    if (!selectedUser || !newMessage) return;

    socket.emit('send-message', {
      sender_id: selectedUser.id,
      receiver_id: selectedUser.id, 
      message: newMessage,
    });

    setMessages([...messages, { sender_id: 'me', message: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="App">
      <div className="user-list">
        {userList.map((user) => (
          <div
            key={user.id}
            className={`user-item ${
              selectedUser && selectedUser.id === user.id ? 'active' : ''
            }`}
            onClick={() => selectUser(user)}
          >
            {user.unreadMessages > 0 && (
              <div className="unread-badge">{user.unreadMessages}</div>
            )}
            {user.nickname}
          </div>
        ))}
      </div>
      <div className="chat-container">
        {selectedUser && (
          <div className="chat-header">{`Chat with ${selectedUser.nickname}`}</div>
        )}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender_id === 'me' ? 'sent' : 'received'
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Message