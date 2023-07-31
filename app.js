/**
 * 
 */
class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
}

Book.prototype.changeReadStatus = function() {
    this.isRead = !this.isRead;
}

/**
 * 
 */
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


/**
 * 
 * @param {*} bookToAdd 
 */
function addBookToLibrary(bookToAdd) {
    const bookGrid = document.querySelector('.book-grid');
    console.log(bookToAdd.title);
    library.push(bookToAdd);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    addBookCardContent(bookCard, bookToAdd);
    bookGrid.appendChild(bookCard);
}


/**
 * 
 * @param {*} bookCard 
 * @param {*} book 
 */
function addBookCardContent(bookCard, book) {
    const titleText = document.createElement('div');
    const authorText = document.createElement('div');
    const numPagesText = document.createElement('div');
    const isReadStatus = document.createElement('button');

    titleText.textContent = `Title: ${book.title}`;
    authorText.textContent = `Author: ${book.author}`;
    numPagesText.textContent = `Number of Pages: ${book.numPages}`;
    if (book.isRead) {
        isReadStatus.classList.remove('book-not-read');
        isReadStatus.classList.add('book-read');
        isReadStatus.textContent = 'Read';
    } 
    else {
        isReadStatus.classList.remove('book-read');
        isReadStatus.classList.add('book-not-read');
        isReadStatus.textContent = 'Not Read';
    }

    isReadStatus.addEventListener('click', () => {
        book.changeReadStatus();
        updateBookCard(bookCard, book);
    });

    const cardElements = [titleText, authorText, numPagesText, isReadStatus];
    for(element of cardElements) {
        bookCard.appendChild(element);
    }
}

function updateBookCard(bookCard, book) {
    const isReadStatus = bookCard.lastChild;
    if (book.isRead) {
        isReadStatus.classList.remove('book-not-read');
        isReadStatus.classList.add('book-read');
        isReadStatus.textContent = 'Read';
    } 
    else {
        isReadStatus.classList.remove('book-read');
        isReadStatus.classList.add('book-not-read');
        isReadStatus.textContent = 'Not Read';
    }
}

let library = [];
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', triggerModal);

// Disable confirm form resubmission dialog
if (window.history.replaceState) {
    window.history.replaceState( null, null, window.location.href );
}