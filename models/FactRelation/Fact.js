const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cateFact = require('./Category')

const Fact = new Schema({
    title: {
        type: String,
        required: 'Title can\'t be empty'
    },
    img: {
        type: String,
        required: 'Image can\'t be empty'
    },
    content: {
        type: String,
        required: 'Content can\'t be empty'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    numberOfViews: {
        type: Number,
        default: 0
    },
    cate: {
        type: Schema.Types.ObjectId,
        ref: cateFact
    }
})

module.exports = mongoose.model('fact', Fact)