const { MongoClient } = require('mongodb');
const mongo = require('mongodb')

require('dotenv').config();

const dbURI = process.env.MONGODB_URI;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(dbURI, mongoOptions);

module.exports = client;
