const { ObjectId } = require('mongodb');
const db = require('./db');

class TagModel {
  constructor() {
    this.collection = db.collection('tags');
  }

  async createTag(tag, count = 0) {
    const tagData = {
      tag: tag,
      count: count,
    };
    const result = await this.collection.insertOne(tagData);
    return result.insertedId;
  }

  // async getAllTags() {
  //   const tags = await this.collection.find({}).toArray();
  //   return tags;
  // }
  async getAllTags(page, perPage, searchFor) {
    try {
      let query = this.collection.find({});
      
      if (searchFor) {
        const searchRegex = new RegExp(searchFor, 'i');
        query = query.filter({ tag: searchRegex });
      }
  
      if (page && perPage) {
        const skipCount = (page - 1) * perPage;
        query = query.skip(skipCount).limit(perPage);
      }
      
      const tags = await query.toArray();
      
      return tags;
    } catch (error) {
      throw error;
    }
  }

  async getTagById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async updateTag(id, updatedData) {
    const filter = { _id: new ObjectId(id) };
    const result = await this.collection.updateOne(filter, { $set: updatedData });
    return result.modifiedCount;
  }

  async deleteTag(id) {
    const filter = { _id: new ObjectId(id) };
    const result = await this.collection.deleteOne(filter);
    return result.deletedCount;
  }

  // increaseTagCount(id) {
  async increaseTagCount(id) {
    const filter = { _id: new ObjectId(id) };
    const tag = await this.collection.findOne(filter);
    const newCount = tag.count + 1;
    const result = await this.collection.updateOne(filter, { $set: { count: newCount } });
    return result.modifiedCount;
  }

  // decreaseTagCount(id) {
  async decreaseTagCount(id) {
    const filter = { _id: new ObjectId(id) };
    const tag = await this.collection.findOne(filter);
    const newCount = tag.count - 1;
    const result = await this.collection.updateOne(filter, { $set: { count: newCount } });
    return result.modifiedCount;
  }

  // searchTagByKeyword(keyword) {
  async searchTagByKeyword(keyword) {
    const filter = { tag: { $regex: keyword, $options: 'i' } };
    const tags = await this.collection.find(filter).toArray();
    return tags;
  }
}

module.exports = new TagModel();
