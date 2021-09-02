// global variable
const searchField = document.getElementById("search-field");
const booksContainer = document.getElementById("books-result");
const totalBooks = document.getElementById("total-book");

const searchBook = () => {
  const searchText = searchField.value;
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data.docs));
};

const displayBooks = (books) => {
  //   console.log(books);
  books.forEach((book) => {
    console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
    
    <img style="height: 380px" src="https://covers.openlibrary.org/b/id/${
      book.cover_i
    }-M.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <h6>Author Name: ${
        book.author_name ? book.author_name[0] : "Unknown Author Name"
      } </h6>
      <h6>publisher Name: ${
        book.publisher ? book.publisher[0] : "Unknown Publisher Name "
      } </h6>
      <h6>First publish Year: ${
        book.first_publish_year ? book.first_publish_year : "Unknown year "
      } </h6>
    </div>
  </div>
    `;
    booksContainer.appendChild(div);
  });
};
searchBook();
