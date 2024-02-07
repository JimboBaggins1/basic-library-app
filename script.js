// script.js

const myLibrary = [];

function Book(title, author, pages, isRead) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    // this.info = function() {
    //     return this.isRead ? `${this.title} by ${this.author}, ${this.pages} pages, read.` : `${this.title} by ${this.author}, ${this.pages} pages, not read.`;
    // };
}

function addBookToLibrary() {
    // Takes user input and adds book to myLibrary
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('is_read').checked;

    const book = new Book(title, author, pages, isRead)

    myLibrary.push(book);
    console.log(`Success. Title = ${book.title} Author = ${book.author} Pages = ${book.pages} isRead = ${book.isRead}.`);
}

function displayLibrary(myLibrary) {
    // Loops through myLibrary and displays current books in a table
    let body = document.body;
    let tbl = document.querySelector('table');
    let tblBody = document.querySelector('tbody');
    let tr = tblBody.insertRow();
    let lastBook = myLibrary[myLibrary.length - 1];

    for (prop in lastBook) {
        let td = tr.insertCell();
        td.appendChild(document.createTextNode(lastBook[prop]));
    };

    const tdLast = tr.insertCell(-1);
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove');
    removeBtn.setAttribute('id', myLibrary.indexOf(lastBook));
    const removeBtnText = document.createTextNode('Remove');
    removeBtn.appendChild(removeBtnText);
    tdLast.appendChild(removeBtn);

    tblBody.appendChild(tr);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

const btn = document.getElementById('submit-btn');

const addBookBtn = document.getElementById('addBook');
const addBookModal = document.getElementById('addBookModal');
const confirmBtn = addBookModal.querySelector('#confirmBtn');

addBookBtn.addEventListener('click', () => { addBookModal.showModal(); });

// addBookModal.addEventListener('close', (e) => {

// })

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookModal.close();
});

confirmBtn.addEventListener('click', addBookToLibrary);
confirmBtn.addEventListener('click', () => { displayLibrary(myLibrary) });

// btn.addEventListener('click', addBookToLibrary);
// btn.addEventListener('click', () => { displayLibrary(myLibrary) });

