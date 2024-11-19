const {verifyBook} = require("../validator/book");
const BookModel = require("../models/Book");
module.exports = {

    createBook: (req, res) => {
        try {
            const isNotValidate = verifyBook(req.body)
            if(isNotValidate) {
                res.status(400);
                res.send({
                    error: isNotValidate.message
                })
            }
            const newBook = new BookModel({
                label: req.body.label,
                description: req.body.description
            })
            newBook.save()
            res.status(201);
            res.send({
                success: true,
                book : newBook
            })
        } catch (error) {
            res.status(500);
            res.send({
                error: error.message
            })
        }
    },

    getAllBooks: async (req, res) => {
        try {
            const books = await BookModel.find();
            res.send(books)
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Cannot retrieve all books'
            })
        }
    }
}