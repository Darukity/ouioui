const express = require ('express');
const app = express();


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


// POST /books create a book
app.post('/api/books', (req, res) => {
    const bookToAdd = req.body;
    books.push(bookToAdd);
    res.send('Le livre a bien crée')
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