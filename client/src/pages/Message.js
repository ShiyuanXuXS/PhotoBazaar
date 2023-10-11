import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('/');

function Message() {
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchUserBy, setSearchUserBy] = useState('');
    const [userListFromSearch, setUserListFromSearch] = useState([]);
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
        setUserList([
            {
                username: 'user1',
                nickname: 'nickname1',
                messages: [{ sender_username: 'user1', receiver_username: 'me', message: 'hello!', isread: false }],
                hasMessageUnread: true
            },
            {
                username: 'user2',
                nickname: 'nickname2',
                messages: [{ sender_username: 'me', receiver_username: 'user2', message: 'bonjour!', isread: false }],
                hasMessageUnread: true
            }])
        //todo: get contacted users

        //todo: get messages from each user
    };

    const selectUser = async (user) => {
        setSelectedUser(user);
        setMessages(user.messages)
    };

    const sendMessage = () => {
        if (!selectedUser || !newMessage) return;

        socket.emit('send-message', {
            sender_username: "my username",
            receiver_username: selectedUser.username, 
            message: newMessage,
        });

        setMessages([...messages, { sender_username: 'user1', message: newMessage }]);
        setNewMessage('');
    };

    const searchUsers = () => {
        setUserListFromSearch([
            {
                username: 'user1',
                nickname: 'nickname1'
            },
            {
                username: 'new user',
                nickname: 'new user from search'
            }
        ])
        
        console.log(userListFromSearch)
        //todo: search users
    }
    const selectUserFromSearch = (selectedResult) => {
        const existingUser = userList.find((user) => user.username === selectedResult.username);

        if (existingUser) {
            selectUser(existingUser);
        } else {
            const newUser = {
            username: selectedResult.username,
            nickname: selectedResult.nickname,
            messages:[]
            };
            setUserList([...userList, newUser]);
            selectUser(newUser);
        }
        setUserListFromSearch([]);
    }
    return (
        <div className="Message">
            <div className='users-container'>
                <div className="user-list">
                    {userList.map((user) => (
                    <div
                        key={user.username}
                        className={`user-item ${
                            selectedUser && selectedUser.username === user.username ? 'active' : ''
                        }`}
                        onClick={() => selectUser(user)}
                    >
                        {user.nickname}
                        {user.hasMessageUnread > 0 && (<div className="unread-badge">New message!</div>)}
                        
                    </div>
                    ))}
                </div>
                <div className="user-search">
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={searchUserBy}
                        onChange={(e) => setSearchUserBy(e.target.value)}
                        />
                    <button onClick={searchUsers}>Search</button>
                    <div className="search-results">
                        {userListFromSearch.map((user) => (
                            <div
                            key={user.username}
                            className="search-result-item"
                            onClick={() => selectUserFromSearch(user)}
                            >
                            {user.username} - {user.nickname}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            
            {selectedUser &&(<div className="chat-container">
                
                <div className="chat-header">{`Chat with ${selectedUser.nickname}`}</div>
                
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
            </div>)}
        </div>
    );
}

export default Message