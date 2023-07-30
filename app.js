let library = [];

class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
}

function triggerModal() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');

    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('hidden');
}

function addBookToLibrary() {
    const bookGrid = document.querySelector('.book-grid');

    // Temporary code
    const newBook = new Book('Test', 'Alex Nguyen', 0, true);
    library.push(newBook);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.textContent(newBook.title); // Testing purposes
    bookGrid.appendChild(bookCard);
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', triggerModal);