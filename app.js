require('dotenv').config()
const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const {verifyBook} = require('./validator/book');
const apiRouter = require('./routes');


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

app.use('/api', apiRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})