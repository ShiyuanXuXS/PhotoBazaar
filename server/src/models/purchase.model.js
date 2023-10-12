const { ObjectId } = require('mongodb');
const db = require('./db'); 

class PurchaseModel {
  constructor() {
    this.collection = db.collection('purchases'); 
  }

  async createPurchase(purchaseData) {
    const result = await this.collection.insertOne(purchaseData);
    return result.insertedId;
  }

  async getAllPurchases() {
    const purchases = await this.collection.find({}).toArray();
    return purchases;
  }

  async getPurchaseById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async updatePurchase(id, updatedData) {
    const filter = { _id: new ObjectId(id) };
    const result = await this.collection.updateOne(filter, { $set: updatedData });
    return result.modifiedCount;
  }

  async deletePurchase(id) {
    const filter = { _id: new ObjectId(id) };
    const result = await this.collection.deleteOne(filter);
    return result.deletedCount;
  }
}

module.exports = new PurchaseModel();
