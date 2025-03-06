/**
 * This file defines the MongoDB user schema using Mongoose.
	•	It describes what data is stored for each user.
	•	It registers the schema so it can be used elsewhere in the app.
 */

    const mongoose = require("mongoose")
    const { Schema } = require("mongoose")
    
    const userSchema = new Schema({
        googleId: String,
        credits: {type: Number, default: 0}
    });
    
    // Registers the schema as a Mongoose model named "users".
    mongoose.model("users", userSchema);