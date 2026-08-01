const API_URL = "http://localhost:8080/api/books";

// Fetch and display all books
function loadBooks() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("bookTableBody");
      tableBody.innerHTML = "";
      data.forEach(book => {
        const row = `<tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td>${book.availableCopies}</td>
                     </tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error("Error fetching books:", error));
}

// Add a new book
function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const availableCopies = parseInt(document.getElementById("availableCopies").value);
  const book = { title, author, isbn, availableCopies };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  })
    .then(response => response.json())
    .then(() => {
      loadBooks();          // refresh table
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("isbn").value = "";
      document.getElementById("availableCopies").value = "";
    })
    .catch(error => console.error("Error adding book:", error));
}

// Load books when page opens
loadBooks();
