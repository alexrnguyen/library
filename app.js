let library = [];

class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
}

function addBookToLibrary() {
    const bookGrid = document.querySelector('.book-grid');

    // Temporary code
    const newBook = new Book('Test', 'Alex Nguyen', 0, true);
    library.push(newBook);
    bookGrid.textContent = library;
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', addBookToLibrary)