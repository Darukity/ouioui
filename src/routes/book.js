const router = require('express').Router();
const bookController = require('../controllers/book');
const { verifyToken } = require('../middleware/jwt');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books API Endpoints
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book with its details, including author reference.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - author
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book.
 *                 example: "un autre book"
 *               description:
 *                 type: string
 *                 description: A brief description of the book.
 *                 example: "un book avec un auteur"
 *               author:
 *                 type: string
 *                 description: The ID of the author for the book.
 *                 example: "6704ebd29dae53d040668ed0"
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the created book.
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the author.
 *                       example: "6704ebd29dae53d040668ed0"
 *                     firstname:
 *                       type: string
 *                       description: The author's first name.
 *                       example: "toto"
 *                     lastname:
 *                       type: string
 *                       description: The author's last name.
 *                       example: "fistname"
 *       400:
 *         description: Bad request - Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, bookController.createBook);

// GET /  get all books
router.get('/', bookController.getAllBooks);

// GET /:id  get a book
router.get('/:id', bookController.getBook);

// PUT /:id  update a book
router.put('/:id', bookController.updateBook);

// DELETE /:id  delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
