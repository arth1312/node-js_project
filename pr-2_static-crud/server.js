const express = require("express");
const server = express();

let books = [
    {
        id: 1,
        name: "The Story of My Experiments with Truth",
        description: "The autobiography covers his early life, studies in England, and experiences as a lawyer and activist in South Africa, which shaped his philosophy of Satyagraha.",
        author: "Mahatma Gandhi"
    },
    {
        id: 2,
        name: "Wings of Fire",
        description: "He also authored many other books, including Ignited Minds and India 2020.",
        author: "Arun Tiwari"
    },
    {
        id: 3,
        name: "The Secret",
        description: "The Secret is a 2006 self-help book.",
        author: "Rhonda Byrne"
    },
    {
        id: 4,
        name: "The Magic",
        description: "The Magic is a 2012 self-help book.",
        author: "Rhonda Byrne"
    },
    {
        id: 5,
        name: "Avengers",
        description: "There isn't a single Avengers book because Avengers is a comic book.",
        author: "Jonathan Hickman"
    }
];

server.use(express.urlencoded());

server.set("view engine", "ejs");

server.get('/', (req, res) => {
    res.render('index', { books });
});

server.get('/add_data', (req, res) => {
    res.render('addData');
});

server.post('/add_data', (req, res) => {
    books.push(req.body);
    res.redirect('/');
});

server.get('/delete_person/:id', (req, res) => {
    let id = req.params.id;
    books = books.filter(book => book.id != id)

    res.redirect('/')
})

server.get('/edit_data/:id', (req, res) => {
    let id = req.params.id;
    let book = books.find(book => book.id == id)

    res.render('editData', { book, id });
});

server.post('/edit_data/:id', (req, res) => {
    let id = req.params.id;
    let record = books.findIndex(book => book.id == id);
    books[record] = { ...books[record], ...req.body };
    res.redirect("/");
});

let port = 8001;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
