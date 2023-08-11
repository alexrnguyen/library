/**
 * A representation of a book in the library
 */
class Book {
  constructor(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  changeReadStatus() {
    this.isRead = !this.isRead;
    console.log(this.isRead);
  }
}

/**
 * Display a modal that prompts the user to enter information about a book
 */
function triggerModal() {
  toggleModal();

  addBookForm.onsubmit = (event) => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numPages = document.getElementById("num-pages").value;
    const isRead = document.getElementById("read").checked;
    const bookToAdd = new Book(title, author, numPages, isRead);
    addBookToLibrary(bookToAdd);

    addBookForm.reset();
    toggleModal();
    event.preventDefault();
  };
}

/**
 * Hide the modal if it is currently visible or show the modal if it is hidden
 */
function toggleModal() {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

/**
 * Add a book to the library and create a book card for the given book
 * @param {*} bookToAdd Book to add to the library
 */
function addBookToLibrary(bookToAdd) {
  // Add book to library
  library.push(bookToAdd);

  // Create new book card
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  // Add index of book as a data attribute of a book card
  bookCard.dataset.index = library.indexOf(bookToAdd);

  addBookCardContent(bookCard, bookToAdd);
  bookGrid.appendChild(bookCard);

  // Update stats
  if (bookToAdd.isRead) {
    totalRead.textContent++;
  } else {
    totalNotRead.textContent++;
  }
  totalBooks.textContent++;
}

/**
 * Add title, author, number of pages, and status to a book card. Each book card also has a delete button
 * @param {*} bookCard Book card to add content to
 * @param {*} book The corresponding book object of the book card
 */
function addBookCardContent(bookCard, book) {
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  const titleText = document.createElement("div");
  const authorText = document.createElement("div");
  const numPagesText = document.createElement("div");
  const isReadStatus = document.createElement("button");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "X";

  titleText.textContent = book.title;
  authorText.textContent = `Author: ${book.author}`;
  numPagesText.textContent = `${book.numPages} pages`;

  titleContainer.appendChild(titleText);
  titleContainer.appendChild(deleteButton);

  const cardElements = [titleContainer, authorText, numPagesText, isReadStatus];
  for (element of cardElements) {
    bookCard.appendChild(element);
  }
  updateBookCard(bookCard, book);

  // Event listeners
  isReadStatus.addEventListener("click", () => {
    book.changeReadStatus();
    updateBookCard(bookCard, book);

    if (book.isRead) {
      totalRead.textContent++;
      totalNotRead.textContent--;
    } else {
      totalNotRead.textContent++;
      totalRead.textContent--;
    }
  });

  deleteButton.addEventListener("click", () => deleteBook(bookCard, book));
}

function updateBookCard(bookCard, book) {
  const isReadStatus = bookCard.lastChild;

  if (book.isRead) {
    isReadStatus.classList.remove("book-not-read");
    isReadStatus.classList.add("book-read");
    isReadStatus.textContent = "Read";
  } else {
    isReadStatus.classList.remove("book-read");
    isReadStatus.classList.add("book-not-read");
    isReadStatus.textContent = "Not Read";
  }
}

/**
 * Removes a book from the library
 * @param {*} bookCard Card to remove from grid
 * @param {*} book Book to remove from array
 */
function deleteBook(bookCard, book) {
  // Remove book from array and grid
  const index = bookCard.dataset.index;
  library.splice(index, 1);
  bookGrid.removeChild(bookCard);

  // Update stats
  if (book.isRead) {
    totalRead.textContent--;
  } else {
    totalNotRead.textContent--;
  }
  totalBooks.textContent--;
}

let library = [];

// HTML Elements
const addButton = document.querySelector(".add-button");
const bookGrid = document.querySelector(".book-grid");
const totalBooks = document.getElementById("total-books");
const totalRead = document.getElementById("total-read");
const totalNotRead = document.getElementById("total-not-read");
const addBookForm = document.getElementById("add-book-form");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");

// Event listeners
addButton.addEventListener("click", triggerModal);

closeButton.addEventListener("click", () => {
  // Reset input element values
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("num-pages").value = "";
  document.getElementById("read").checked = false;
  toggleModal();
});

// Disable confirm form resubmission dialog
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
