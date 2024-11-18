require('dotenv').config()
const express = require ('express');
const app = express();
const mongoose = require('mongoose');


let books = [
    {
        id: 1,
        label: "Les miserables"
    },
    {
        id:2,
        label: "Le comte de montecristo"
    }
]

//Parse des requetes en JSON
app.use(express.json())

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connection has been etablished successfully')
    }).catch((error) => {
        console.error('Unable to connect database: ', error)
})


app.get('/', (req, res) => {
    res.send('Hello word');
});


// GET /books  get all books
app.get('/api/books', (req, res) => {
    res.send(books)
});

// GET /books/:id  get book by id
app.get('/api/books/:id', (req, res) => {
    const bookId = +req.params.id
    const book = books.find(book => book.id === bookId)
    res.send(book)
});

const BookModel = require('./models/Book');
// POST /books create a book
app.post('/api/books', (req, res) => {

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
});

// PUT /books update a book
app.put('/api/books/:id', (req, res) => {
    const bookId = +req.params.id;
    const bookToUpdate = req.body;

    books = books.map(book => {
        if(book.id === bookId) {
            return {
                ...book,
                ...bookToUpdate
            }
        }
        return  book
    })
    res.send(`Le livre ${bookId} a été mise a jour`);
});


// DELETE /books delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = +req.params.id;
    books = books.filter(book => book.id !== bookId)
    res.send(`Le livre ${bookId} a bien supprimé`)
});



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})