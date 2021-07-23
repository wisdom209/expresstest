const mongoose = require("mongoose")

const user = mongoose.model("user", new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}))

module.exports = user