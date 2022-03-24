const { Schema, model} = require('mongoose')

const CardSchema = new Schema({
    CardNumber: String,
    ExpDate: String,
    Cvv: Number,
    Amount: Number
})

module.exports = model('Card', CardSchema)