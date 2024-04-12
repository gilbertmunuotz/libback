var mongoose = require('mongoose');

//Define Your Schema Here
var bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: String, required: true },
}, { timestamps: true });


var bookModel = mongoose.model("User", bookSchema);

module.exports = bookModel