const mongoose = require("mongoose")

const Person = mongoose.model("person", new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type : String,
        required: true
    }
}))

module.exports = Person