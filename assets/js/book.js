let test = document.querySelector("#book-name")

// get data from main page
const url_params = (new URLSearchParams(window.location.search)).get('book_name');

test.textContent = url_params;

// need to use book api here
