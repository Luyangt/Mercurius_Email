const mongoose = require('mongoose');
const { Schema } = mongoose;
const Recipient = require('./Recipient');

const recipientSchema = new Schema({
    email: String,
    responded: { type : Boolean, default: false }
});

module.exports = recipientSchema; // we are not creating a model here, just a schema