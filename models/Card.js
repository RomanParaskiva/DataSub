const { Schema, model} = require('mongoose')

const CardSchema = new Schema({
    cardNumber: String,
    expDate: String,
    cvv: Number,
    amount: Number
})

module.exports = model('Card', CardSchema)