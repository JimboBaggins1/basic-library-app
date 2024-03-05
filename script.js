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

Book.prototype.toggleRead = function(readStatus) {
  if (readStatus === 'true') {
    return this.isRead = false;
  } else { return this.isRead = true; }
}

function addBookToLibrary() {
  // Takes user input and adds book to myLibrary
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  const book = new Book(title, author, pages, isRead);

  myLibrary.push(book);
  console.log(
    `Success. Title = ${book.title} Author = ${book.author} Pages = ${book.pages} isRead = ${book.isRead}.`
  );
}

function displayLibrary(myLibrary) {
  // Loops through myLibrary and displays current books in a table
  const body = document.body;
  const tbl = document.querySelector("table");
  const tblBody = document.querySelector("tbody");

  // This resets the table to just the thead section
  while (tblBody.childNodes.length) {
    tblBody.removeChild(tblBody.childNodes[0]);
  }

  // Add a row for each book currently in library. For each row, populate with book properties
  // Add a remove button to the end of each row
  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    for (prop in book) {
      // Do not create a cell for the toggleRead prop
      if (prop !== 'toggleRead') {
        const cell = document.createElement("td");
      // for the isRead prop, create a button so user can toggle
        if (prop === 'isRead') {
          const readBtn = document.createElement("button");
          // Toggles whether button is red or green based on whether book has been read
          book[prop] ? readBtn.setAttribute("class", "isRead green") : readBtn.setAttribute("class", "isRead red");
          readBtn.setAttribute("value", myLibrary.indexOf(book));
          readBtn.setAttribute("data-state", book[prop]);
          const readBtnText = document.createTextNode(book[prop]);
          readBtn.appendChild(readBtnText);
          cell.appendChild(readBtn);
        } else {
          const cellText = document.createTextNode(book[prop]);
          cell.appendChild(cellText);
        }
        row.appendChild(cell);
      }
      
    }
    const lastRow = row.insertCell(-1);
    addRemoveBtn(myLibrary.indexOf(book), lastRow);

    tblBody.appendChild(row);
  });

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
}

function addRemoveBtn(elem, cell) {
  // Creates remove button with id = array index, and appends button to chosen table cell
  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", "remove");
  removeBtn.setAttribute("value", elem);
  const removeBtnText = document.createTextNode("Remove");
  removeBtn.appendChild(removeBtnText);
  cell.appendChild(removeBtn);
}

function resetModal() {
  // Reset the modal so that old data is not show on modal open
  document.getElementById("modalForm").reset();
}

function removeBook(arr, arrIndex) {
  // Remove book from myLibrary
  if (arrIndex > -1) {
    arr.splice(arrIndex, 1);
  }
}

 
const addBookBtn = document.getElementById("addBook");
const addBookModal = document.getElementById("addBookModal");
const confirmBtn = addBookModal.querySelector("#confirmBtn");
const table = document.querySelector("table");
const requiredTitle = document.getElementById("title");
const requiredAuthor = document.getElementById("author");

addBookModal.addEventListener("close", resetModal);

addBookBtn.addEventListener("click", () => {
  addBookModal.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (requiredTitle.value.length > 0 && requiredAuthor.value.length > 0) {
    addBookToLibrary();
    addBookModal.close();
    displayLibrary(myLibrary);
  }
});

requiredTitle.addEventListener("focusout", function() {
  if (this.value.length == 0) {
    this.classList.add('error');
  } else {
    this.classList.remove('error');
  }
});

requiredAuthor.addEventListener("focusout", function () {
  if (this.value.length == 0) {
    this.classList.add('error');
  } else {
    this.classList.remove('error');
  }
});

// confirmBtn.addEventListener("click", addBookToLibrary);
// confirmBtn.addEventListener("click", () => {
//   displayLibrary(myLibrary);
// });

// Remove book from myLibrary and update table on click of a Remove button. Event listener needs to be attached to table element, as Remove buttons don't exist in DOM when script is first run
table.addEventListener("click", (e) => {
  const target = e.target;
  //checks if remove
  if (target.matches(".remove")) {
    const removeButton = e.target;
    let i = parseInt(removeButton.value);
    removeBook(myLibrary, i);
    console.log(i);
    displayLibrary(myLibrary);
  }

  if (target.matches(".isRead")) {
    const readButton = e.target;
    let readState = readButton.getAttribute("data-state");
    let book = parseInt(readButton.value);
    myLibrary[book].toggleRead(readState);
    displayLibrary(myLibrary);
  }
});
