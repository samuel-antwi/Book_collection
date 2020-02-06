const form = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');
const table = document.querySelector('table');
const errorMessage = document.querySelector('.error-message');
const successMessage = document.querySelector('.success-message');
const clearButt = document.querySelector('.clear-button');




// Book class
class Book{
  constructor(title, author, isbn, year) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
  }
  static showErrorMessage() {
    const html = `
    <p class="error">All input field required</p>
    `;
    errorMessage.innerHTML += html;
  }
  static showsuccessMessage() {
    const html = `
    <p class="success">Book added successfully</p>
    `;
    successMessage.innerHTML += html;
  }
}

// Extending the book class
class UI extends Book{
  constructor(title, author, isbn, year){
    super(title, author, isbn, year);
  }
  // add book method
  addBookToList(book) {
     const row = document.createElement('tr');
     row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.year}</td>
      <td><a class="delete-book" href="#">X</a></td>
     `;
     bookList.appendChild(row);
  }
  deleteBook(e) {
      const deleteItem = e.target.parentElement.parentElement
      deleteItem.remove();
    
  }

  clearAllBooks() {
    bookList.innerHTML = '';
  }
};


// Add an event listener
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const year = document.getElementById('year').value;

  // Instantiate the book
  const book = new Book(title, author, isbn, year);
  // Instantiate the ui class
  const ui = new UI();
  // Adding book
  if(title === '' || author === '' || isbn === '' || year === '') {
    Book.showErrorMessage();
    setTimeout(() => {
      errorMessage.innerHTML = '';
    }, 2000);
  } else {
    ui.addBookToList(book);
    Book.showsuccessMessage();
    form.reset();
    setTimeout(() => {
      successMessage.innerHTML = '';
    }, 2000);
  }
});

// Deleting a Book from the UI.
table.addEventListener('click', e => {
  const ui = new UI();
  if(e.target.classList.contains('delete-book')){
    ui.deleteBook(e);
  } 
});

// Clear All Books from UI
clearButt.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const book = new Book(title, author, isbn, year);
  const ui = new UI();
    if(confirm('Are you sure you want to clear all books?')) {
      ui.clearAllBooks();
  } 
});

