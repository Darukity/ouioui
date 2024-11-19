const { verifyBook } = require('../validator/book');
const BookModel = require('../models/Book');
module.exports = {
    createBook: (req, res) => {
        try {
            const isNotValidate = verifyBook(req.body);
            if (isNotValidate) {
                res.status(400);
                res.send({
                    error: isNotValidate.message
                });
            }
            const newBook = new BookModel({
                label: req.body.label,
                description: req.body.description
            });

            newBook.author = req.user;
            newBook.save();

            const { id, firstname, lastname } = req.user;
            newBook.author = {
                id,
                firstname,
                lastname
            };
            res.status(201);
            res.send({
                success: true,
                book: newBook
            });
        } catch (error) {
            res.status(500);
            res.send({
                error: error.message
            });
        }
    },

    getAllBooks: async (req, res) => {
        try {
            const books = await BookModel.find();
            res.send(books);
        } catch (error) {
            res.status(500).send({
                message: error.message || 'Cannot retrieve all books'
            });
        }
    },

    getBook: async (req, res) => {
        const bookId = req.params.id;
        try {
            const book = await BookModel.findById(bookId);
            res.send(book);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: `Error retrieving book with id=${bookId}`
            });
        }
    },

    updateBook: async (req, res) => {
        try {
            const bookId = req.params.id;

            const isNotValidate = verifyBook(req.body);
            if (isNotValidate) {
                res.status(400);
                res.send({
                    error: isNotValidate.message
                });
            }

            const updatedBook = await BookModel.findByIdAndUpdate(bookId, req.body, {
                new: true
            });

            // Vérifiez si le livre existe
            if (!updatedBook) {
                return res.status(404).send({
                    message: `Book with id=${bookId} not found.`
                });
            }

            res.send({
                message: 'BookModel was updated successfully.',
                data: updatedBook
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || `Error updating book with id=${req.params.id}`
            });
        }
    },

    deleteBook: async (req, res) => {
        try {
            const bookId = req.params.id;
            const book = await BookModel.findByIdAndDelete(bookId);

            if (book) {
                res.status(204).send({
                    message: 'BookModel has been removed successfully.'
                });
            } else {
                res.status(400).send(`No record with given id: ${bookId}`);
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || `Error deleting book with id=${req.params.id}`
            });
        }
    }
};
