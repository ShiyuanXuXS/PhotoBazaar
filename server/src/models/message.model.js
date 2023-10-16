//message.model.js
const db = require('./db');
const { ObjectID } = require('mongodb');

class Message {
    constructor() {
        this.collection = db.collection('messages');
    }

    async save(sender_id, receiver_id, message) {
        const messageData = {
            sender_id: sender_id,
            receiver_id: receiver_id,
            message: message
        }
        try {
            const result = await this.collection.insertOne(messageData);
            return result.insertedId;
        } catch (error) {
            throw error;
        }
    }

    async findAllByUser(user_id) {
        try {
            const messages = await this.collection.find({
                $or: [{ sender_id: user_id }, { receiver_id: user_id }]
            }).sort({ send_time: 1 }).toArray();
            return messages;
        } catch (error) {
            throw error;
        }
    }

    async markAsRead(messageId) {
        try {
            const filter = { _id: new ObjectID(messageId) };
            const update = { $set: { isread: true } };
            await this.collection.updateOne(filter, update);
        } catch (error) {
            throw error;
        }
    }

    async delete(messageId) {
        try {
            const filter = { _id: new ObjectID(messageId) };
            await this.collection.deleteOne(filter);
        } catch (error) {
            throw error;
        }
    }

    async  deleteAll() {
        try {
            const result = await this.collection.deleteMany({});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Message();
