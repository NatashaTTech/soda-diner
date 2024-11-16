const mongoose = require('mongoose');
const { Schema } = mongoose;

const DinerSchema = new Schema(
    {
        name: {type: String, unique: true},
        location: String,
        sodas: Array,
    }
)
const Diner = mongoose.model('diner', DinerSchema)

module.exports = Diner;