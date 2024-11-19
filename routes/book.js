const router = require('express').Router();
const bookController = require('../controllers/book');

// POST /  create a book
router.post('/', bookController.createBook);

// GET /  get all books
router.get('/', bookController.getAllBooks);

// GET /:id  get a book
router.get('/:id', bookController.getBook);


// PUT /:id  update a book
router.put('/:id', bookController.updateBook);


// DELETE /:id  delete a book
router.delete('/:id', bookController.deleteBook);


module.exports = router;