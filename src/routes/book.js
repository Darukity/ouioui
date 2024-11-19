const router = require('express').Router();
const bookController = require('../controllers/book');
const { verifyToken } = require('../middleware/jwt');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book with its details, including author reference.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: [] # Add this line to require the Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - description
 *               - author
 *             properties:
 *               label:
 *                 type: string
 *                 description: The name of the book.
 *                 example: "un autre book"
 *               description:
 *                 type: string
 *                 description: A brief description of the book.
 *                 example: "un book avec un auteur"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request - Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, bookController.createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve all books
 *     description: Get a list of all books in the database.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the book.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   name:
 *                     type: string
 *                     description: The name of the book.
 *                     example: "un autre book"
 *                   description:
 *                     type: string
 *                     description: A brief description of the book.
 *                     example: "un book avec un auteur"
 *                   author:
 *                     type: string
 *                     description: The ID of the author of the book.
 *                     example: "6704ebd29dae53d040668ed0"
 *       500:
 *         description: Internal server error
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     description: Get details of a specific book using its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book.
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the book.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 name:
 *                   type: string
 *                   description: The name of the book.
 *                   example: "un autre book"
 *                 description:
 *                   type: string
 *                   description: A brief description of the book.
 *                   example: "un book avec un auteur"
 *                 author:
 *                   type: string
 *                   description: The ID of the author of the book.
 *                   example: "6704ebd29dae53d040668ed0"
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', bookController.getBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Update the details of an existing book using its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book.
 *                 example: "updated book name"
 *               description:
 *                 type: string
 *                 description: A brief description of the book.
 *                 example: "updated book description"
 *               author:
 *                 type: string
 *                 description: The ID of the author for the book.
 *                 example: "6704ebd29dae53d040668ed0"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad request - Invalid input
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book using its unique ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book.
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
