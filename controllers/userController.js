var Joi = require('joi');
var bookModel = require('../models/bookModel');


//(DESC) A sample to test the routes & connections
async function checkConnection(req, res) {
    res.send('Hello Welcome Back')
}

//(DESC) Posting Books
async function postBooks(req, res) {
    try {
        const { title, author, publishYear } = req.body
        const schema = Joi.object({
            title: Joi.string().min(3).max(50).required(),
            author: Joi.string().min(3).max(50).required(),
            publishYear: Joi.number().required(),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({ errors: error.details.map(detail => detail.message) });
        }
        const newBook = await bookModel.create({ title, author, publishYear })

        // Respond with the saved user data
        res.json({ newCreatedBook: newBook, message: "Post successful" });

    } catch (error) {
        console.error('Error saving data', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
}


//(DESC) Getting All Books
async function getBooks(req, res) {
    try {
        const books = await bookModel.find({})
        res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error("Error Getting Data", error);
        res.status(500).send({ status: 'error', message: "Internal Server Error" });
    }
}


//(DESC) Getting Specific Book By Id
async function getSingleBook(req, res) {
    try {
        const { id } = req.params;

        const book = await bookModel.findById(id);

        if (!book) {
            res.status(404).send({ status: "Error", message: "Book Not Found" })
        } else {
            return res.status(200).json(book)
        }
    } catch (error) {
        console.error("Error Getting Data", error);
        res.status(500).send({ status: 'error', message: "Internal Server Error" });
    }
}


//(DESC) Update A Book 
async function updateBook(req, res) {
    try {
        const { id } = req.params;

        // Create an object to hold the fields to be updated 
        const updatedFields = { title: req.body.title, author: req.body.author, publishYear: req.body.publishYear };

        const updatingBooks = await bookModel.findByIdAndUpdate(id, updatedFields);

        if (!updatingBooks) {
            return res.status(404).json({ message: "Book Not Found" });
        } else {
            return res.status(200).send({ message: "Updated Succesfully" });
        }

    } catch (error) {
        console.error("Error Updating Book", error);
        res.status(500).send({ status: "error", message: "Internal server Error" });
    }
}


//(DESC) Delete A Book
async function deleteABook(req, res) {
    try {

        const { id } = req.params;

        const deleteBook = await bookModel.findByIdAndDelete(id);

        if (!deleteBook) {
            res.status(404).json({ message: "Book Not Found" });
        } else {
            res.status(200).json({ message: "Book deleted Succesfully" });
        }

    } catch (error) {
        console.error("Error Deleting A Book", error);
        res.status(500).send({ status: "Error", message: "Internal Server Error" });
    }
}


module.exports = { checkConnection, postBooks, getBooks, getSingleBook, updateBook, deleteABook }