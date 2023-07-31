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
    const overlay = document.querySelector('.overlay');
    toggleModal();

    const addBookForm = document.querySelector('#add-book-form');
    addBookForm.onsubmit = (event) => {
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const numPages = document.querySelector('#num-pages').value;
        const isRead = document.querySelector('#read').checked;
        const bookToAdd = new Book(title, author, numPages, isRead);
        addBookToLibrary(bookToAdd);

        addBookForm.reset();
        toggleModal();
        event.preventDefault();
    };
}

/**
 * 
 */
function toggleModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}


/**
 * 
 * @param {*} bookToAdd 
 */
function addBookToLibrary(bookToAdd) {
    // Add book to grid (library)
    const bookGrid = document.querySelector('.book-grid');
    console.log(bookToAdd.title);
    library.push(bookToAdd);

    // Create new book card
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    addBookCardContent(bookCard, bookToAdd);
    bookGrid.appendChild(bookCard);

    // Update stats
    if (bookToAdd.isRead) {
        const totalRead = document.querySelector('#total-read');
        totalRead.textContent++;
    }
    else {
        const totalNotRead = document.querySelector('#total-not-read');
        totalNotRead.textContent++;
    }
    const totalBooks = document.querySelector('#total-books');
    totalBooks.textContent++;
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

    const cardElements = [titleText, authorText, numPagesText, isReadStatus];
    for(element of cardElements) {
        bookCard.appendChild(element);
    }

    updateBookCard(bookCard, book);

    isReadStatus.addEventListener('click', () => {
        book.changeReadStatus();
        updateBookCard(bookCard, book);
        const totalRead = document.querySelector('#total-read');
        const totalNotRead = document.querySelector('#total-not-read');

        if (book.isRead) {
            totalRead.textContent++;
            totalNotRead.textContent--;
        }
        else {
            totalNotRead.textContent++;
            totalRead.textContent--;
        }
    });
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