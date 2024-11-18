const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
  }, {
        timestamps: true
    })

const Book = mongoose.model('Book', BookSchema);

module.exports = Book