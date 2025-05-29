const express = require('express');
const app = express();
const PORT = 3000;

//In-memory book list
let books = [
    {
        id: 1, title: "Adventures of Tom Sawyer", author: "Mark Twin"
    },
    {
        id: 2, title: "Alice in Wonderland", author: "Lweis Carroll"
    },
    {
        id: 3, title: "Arthashastra", author: "Kautilya"
    },
    {
        id: 4, title: "Ancient Mariner", author: "Colridge"
    },
    {
        id: 5, title: "Adventures of Sherlock Holmes", author: "Arthur Conan Doyle"
    },
    {
        id: 6, title: "Pride and Prejudice", author: "Jane Austen"
    }
]

//Middleware to parse JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

//Get all books
app.get('/books', (req,res) => {
    res.json(books);
});

//Get a single book
app.get('/books/:id', (req,res) => {
    const book = books.find(b => b.id == req.params.id);
    if(!book) return res.status(404).json({message: 'Book Not Found'});
    res.json(book);
});

//Add a new book
app.post('/books', (req,res) => {
    const {title,author} = req.body;
    const newBook = {id: books.length+1,title,author};
    books.push(newBook);
    res.status(201).json(newBook);
});

//Update a book
app.put('/books/:id',(req,res) => {
    const book = books.find(b => b.id == req.params.id);
    if(!book) return res.status(404).json({message: 'Book Not Found'});
    // book.title = req.body.title || book.title;
    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

//Delete a book
app.delete('/books/:id',(req,res) => {
    books = books.filter(b => b.id != req.params.id);
    res.status(204).send();
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});