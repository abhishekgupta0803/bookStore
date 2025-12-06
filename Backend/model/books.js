const mongoose = require('mongoose');

const bookSchema = mongoose.Schema ({
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String,
    free: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        default: ""
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;