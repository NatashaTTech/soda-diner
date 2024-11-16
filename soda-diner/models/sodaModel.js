const mongoose = require('mongoose')
const { Schema } = mongoose;

const SodaSchema = new Schema(
    {
        name: {type: String, unique: true},
        fizziness: Number,
        tasteRating: Number
    }
)
const Soda = mongoose.model('soda', SodaSchema)

module.exports = Soda;