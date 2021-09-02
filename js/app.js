// global variable
const searchField = document.getElementById("search-field");
const booksContainer = document.getElementById("books-result");
const totalBooks = document.getElementById("total-book");
const errorMessage = document.getElementById("error-message");

// Spinner function
const spinner = (style) => {
  document.getElementById("spinner").style.display = style;
};

//input value and button click
const searchBook = () => {
  // Display spinner
  spinner("block");
  //clear Dom
  booksContainer.textContent = "";
  errorMessage.textContent = "";
  totalBooks.textContent = "";
  const searchText = searchField.value;
  //error handel
  if (searchText === "") {
    errorMessage.innerText = "please write books name";
    // Hide spinner
    spinner("none");
  } else {
    //API call
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBooks(data));
  }
  //input clear
  searchField.value = "";
};

//Getting All Display Books content
const displayBooks = (books) => {
  if (books.numFound === 0) {
    errorMessage.innerText = "Key word dos't match";
  } else {
    //total search result
    totalBooks.innerHTML = `
    <h3 class="">Total Books: ${books.numFound}</h3>
  `;
    const items = books.docs;
    items.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div class="card h-100">
    <img style="height: 380px" src="https://covers.openlibrary.org/b/id/${
      book.cover_i
    }-M.jpg" class="card-img-top" alt="..." />
    <div class="card-body mt-2 shadow-lg">
      <h5 class="card-title mt-2">${book.title}</h5>
      <h6>Author Name: ${
        book.author_name ? book.author_name[0] : "Unknown Author Name"
      } </h6>
      <p>Publisher Name: ${
        book.publisher ? book.publisher[0] : "Unknown Publisher Name "
      } </p>
      <p>First publish Year: ${
        book.first_publish_year ? book.first_publish_year : "Unknown year "
      } </p>
    </div>
  </div>
    `;
      booksContainer.appendChild(div);
    });
  }
  // Hide spinner
  spinner("none");
};
