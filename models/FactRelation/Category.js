const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoryFact = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    }
})

module.exports = mongoose.model('cateFact', CategoryFact)