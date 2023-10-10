//message.controller.js
const Message = require('../models/message.model');

class MessageController {
    constructor() {
        this.messageModel = new Message();
    }

    async createMessage(req, res) {
        const { sender_id, receiver_id, message } = req.body;

        try {
            const insertedId = await this.messageModel.save(sender_id, receiver_id, message);
            res.status(200).json({ _id: insertedId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create message' });
        }
    }

    async getUserMessages(req, res) {
        const { sender_id, receiver_id } = req.query;

        try {
            const messages = await this.messageModel.findAllByUsers(sender_id, receiver_id);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve messages' });
        }
    }

    async markMessageAsRead(req, res) {
        const { messageId } = req.params;

        try {
            await this.messageModel.markAsRead(messageId);
            res.status(200).json({ message: 'Message marked as read' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to mark message as read' });
        }
    }

    async deleteMessage(req, res) {
        const { messageId } = req.params;

        try {
            await this.messageModel.delete(messageId);
            res.status(200).json({ message: 'Message deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete message' });
        }
    }
}

module.exports = MessageController;
