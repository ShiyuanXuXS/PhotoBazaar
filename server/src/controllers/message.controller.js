//message.controller.js
const Message = require('../models/message.model');
const UserModel = require('../models/user.model');

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'importantsecret';

class MessageController {

    async createMessage(req, res) {
        //todo: auth
        const { sender_id, receiver_id, message } = req.body;

        try {
            const insertedId = await Message.save(sender_id, receiver_id, message);
            return res.status(200).json({ _id: insertedId });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create message' });
        }
    }

    // async getUserMessages(req, res) {
    //     const { authorization } = req.headers;
    //     if (!authorization) { return res.status(400).json({ message: "No authorization" }); }
    //     const token = authorization.split(' ')[1];
    //     if (!token) { return res.status(400).json({ message: "No token" }); }
    //     jwt.verify(token, secretKey, async (err, decoded) => {
    //         if (err) {
    //             return res.status(400).json({ error: "Token is invalid" });
    //         }
    //         const user_id = decoded.id;
    //         try {
    //             const messages = await Message.findAllByUser(user_id);
    //             let userMessages = [];
    //             messages.forEach(async (message) => {
    //                 const foundUser = userMessages.some((userMessage) =>userMessage.id === message.sender_id || userMessage.id === message.receiver_id);
    //                 //user not in userMessages, create a new user
    //                 if (!foundUser) {
    //                     const id = (message.sender_id === user_id) ? message.receiver_id : message.sender_id;
                        
    //                     try {
    //                         const user = await UserModel.findOne({ _id: id }); 
    //                         console.log(user.username)  //在这里能够打印user.username，说明已经查到了user
    //                         if (user) {
    //                             console.log("create a user")
    //                             userMessages.push({
    //                                 id: user.id,
    //                                 username: user.username,
    //                                 nickname: user.nickname,
    //                                 messages: [
    //                                 message,
    //                                 ],
    //                                 hasMessageUnread: !message.is_read,
    //                             });
    //                             console.log(userMessages)//在这里userMessages有一个元素，新的user是可以放进usermessages的
                            
    //                         }
    //                     } catch(err) {
    //                         // console.log(err)
    //                     }
    //                 } else {
    //                     console.log("push a message")   //第二条message应该在这里处理，但是这条语句执行不到
    //                     // sender_id or receiver_id exists in userMessages
    //                     const userToUpdate = userMessages.find((user) => user.id === message.sender_id || user.id === message.receiver_id);
    //                     userToUpdate.messages.push(message);
    //                     userToUpdate.hasMessageUnread = userToUpdate.hasMessageUnread || !message.is_read;
    //                 }
                    
    //             });
                
    //             console.log(userMessages)//这里userMessages应该是有一个元素，这个元素的messages字段里面有两个元素。但结果是空数组。为什么？
    //             return res.status(200).json(userMessages);
    //         } catch (error) {
    //             return res.status(500).json({ error: 'Failed to retrieve messages' });
    //         }

    //     });


       
    // }
    
    
    
    async getUserMessages(req, res) {
        const { authorization } = req.headers;
    
        if (!authorization) {
            return res.status(400).json({ message: "No authorization" });
        }
    
        const token = authorization.split(' ')[1];
    
        if (!token) {
            return res.status(400).json({ message: "No token" });
        }
    
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Token is invalid" });
            }
            const user_id = decoded.id;
            const username = decoded.username;
            try {
                const messages = await Message.findAllByUser(user_id);
                // console.log(messages)
                let userMessages = [];
    
                for (const message of messages) {
                    const foundUser = userMessages.some((userMessage) => userMessage.id === message.sender_id || userMessage.id === message.receiver_id);
    
                    if (!foundUser) {
                        const id = (message.sender_id === user_id) ? message.receiver_id : message.sender_id;
    
                        try {
                            const user = await UserModel.findOne({ _id: id });
    
                            if (user) {
                                console.log("create a user");
                                userMessages.push({
                                    id: user.id,
                                    username: user.username,
                                    nickname: user.nickname,
                                    messages: [{
                                        sender_username: message.sender_id === user_id ? decoded.username:user.username,
                                        receiver_username: message.receiver_id === user_id ? decoded.username:user.username ,
                                        message: message.message,
                                        is_read:message.is_read
                                    }],
                                    hasMessageUnread: !message.is_read,
                                });
                                console.log(userMessages);
                            }
                        } catch (err) {
                            // console.log(err)
                        }
                    } else {
                        console.log("push a message");
                        const userToUpdate = userMessages.find((user) => user.id === message.sender_id || user.id === message.receiver_id);
                        userToUpdate.messages.push({
                            sender_username: message.sender_id === user_id ? decoded.username:userToUpdate.username,
                            receiver_username: message.receiver_id === user_id ? decoded.username:userToUpdate.username ,
                            message: message.message,
                            is_read:message.is_read
                        });
                        userToUpdate.hasMessageUnread = userToUpdate.hasMessageUnread || !message.is_read;
                    }
                }
    
                console.log(userMessages);
                return res.status(200).json(userMessages);
            } catch (error) {
                return res.status(500).json({ error: 'Failed to retrieve messages' });
            }
        });
    }
    
    
    
    
    

    async markMessageAsRead(req, res) {
        //todo: auth
        const { messageId } = req.params;

        try {
            await Message.markAsRead(messageId);
            return res.status(200).json({ message: 'Message marked as read' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to mark message as read' });
        }
    }

    async deleteMessage(req, res) {
        //todo: auth
        const { messageId } = req.params;

        try {
            await Message.delete(messageId);
            return res.status(200).json({ message: 'Message deleted' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete message' });
        }
    }

    async deleteAllMessages(req, res) {
        try {
            await Message.deleteAll();
            return res.status(200).json({ message: 'Messages deleted' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete messages' });
        }
    }
}

module.exports = MessageController;
