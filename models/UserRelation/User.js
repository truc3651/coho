const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        min: [3, 'Password is too weak'],
        max: 10
    },
    gender: {
        type: String
    },
    age: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('user', User)