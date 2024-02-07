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
    const headers = ['Title', 'Author', 'Pages', 'Read/Unread']
    let body = document.body;
    let tbl = document.createElement('table');
    let hRow = document.createElement('tr');
    tbl.appendChild(hRow);


    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';
    
    for (heading in headers) {
        let th = document.createElement('th');
        let thText = document.createTextNode(headers[heading]);
        th.appendChild(thText);
        hRow.appendChild(th);
        th.style.border = '1px solid black';
    }

    myLibrary.forEach((book) => {
        let tr = tbl.insertRow();
        for (prop in book) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(book[prop]));
            td.style.border = '1px solid black';
        }
    });
    tbl.style.borderCollapse = 'collapse';
    body.appendChild(tbl);
}

