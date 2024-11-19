const router = require('express').Router();
const bookController = require('../controllers/book');

// POST /  create a book
router.post('/', bookController.createBook);

// GET /  get all books
router.get('/', bookController.getAllBooks);


module.exports = router;