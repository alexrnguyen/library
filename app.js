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

    console.log('Modal');
    const addBookForm = document.querySelector('#add-book-form');
    addBookForm.onsubmit = (event) => {
        console.log('Submitted');
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const numPages = document.querySelector('#num-pages').value;
        const isRead = document.querySelector('#read').checked;
        const bookToAdd = new Book(title, author, numPages, isRead);
        addBookToLibrary(bookToAdd);

        addBookForm.reset();
        modal.classList.add('hidden');
        overlay.classList.add('hidden');

        event.preventDefault();
    };
}

function addBookToLibrary(bookToAdd) {
    const bookGrid = document.querySelector('.book-grid');
    console.log(bookToAdd.title);
    library.push(bookToAdd);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.textContent = bookToAdd.title; // Testing purposes
    bookGrid.appendChild(bookCard);
}

function addBookCardContent(bookCard) {
    const titleText = document.createElement('div');
    const authorText = document.createElement('div');
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', triggerModal);