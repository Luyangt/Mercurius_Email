const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose; is the same as this line

// Define a new schema
const userSchema = new Schema({
    googleId : String
});

mongoose.model('users', userSchema); // this creates a new collection called users