const modal_sign_in_element = $(".sign-in-modal")
const modal_sign_in_close_element = $(".sign-in-close")
const nav_sign_in_element = $("#nav-sign-in")


let book_image = document.querySelector(".book-image")
let book_name = document.querySelector(".book-name")
let book_author = document.querySelector(".book-author")
let result_container= $(".result-container")

// get data from main page
const input_value = (new URLSearchParams(window.location.search)).get('input');
const category_type = (new URLSearchParams(window.location.search)).get('category');



// open sign in modal
open_sign_in_modal = function(){
	modal_sign_in_element.addClass("is-active")
}
//close sign modal
close_sign_in_modal = function(){
	modal_sign_in_element.removeClass("is-active")
}

// add event to open the sign in modal
nav_sign_in_element.on("click",function(){
	open_sign_in_modal()
})

//add event to close the sign in modal
modal_sign_in_close_element.on("click",function(){
	close_sign_in_modal()
})


// need to use book api here
run_book_api = function(user_input,category_type){
    // use the api here
    if(category_type=="inauthor"){
      var bookApi = `https://www.googleapis.com/books/v1/volumes?q=${user_input}+inauthor&maxResults=40`
    }
    else if(category_type=="intitle"){
      var bookApi = `https://www.googleapis.com/books/v1/volumes?q=${user_input}+intitle&maxResults=40`
    }
    else if(category_type=="subject"){
      var bookApi = `https://www.googleapis.com/books/v1/volumes?q=${user_input}+subject&maxResults=40`
    }

    fetch(bookApi)
    .then(response => {
        // Check the response status code
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the response as JSON data
        return response.json();
      })
      .then(data => {
        handleResponse(data)
      })
}


function handleResponse(response) {
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      let bookInfo = {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        imageLinks: item.volumeInfo.imageLinks.thumbnail,
        }
      // in production code, item.text should have the HTML entities escaped.
      createBookCard(bookInfo);
    }
}
function createBookCard(bookInfo) {
  // create card holder
  const card_column = $("<div></div>")
  card_column.addClass("card-column")
  result_container.append(card_column)
  // create card figure
  const figure = $("<figure></figure>")
  figure.addClass("card code-card")
  card_column.append(figure)
  // create card name
  const card_name = $("<h2></h2>")
  card_name.addClass("card-header")
  card_name.text(bookInfo.title)
  figure.append(card_name)
  // create card pre section
  const card_pre = $("<pre></pre>")
  card_pre.addClass("code-block")
  figure.append(card_pre)
  //create card image
  const card_image = $("<img></img>")
  card_image.attr("src", bookInfo.imageLinks)
  card_image.attr("alt", "book logo")
  card_pre.append(card_image)
  //create author info
  const card_author = $("<p></p>")
  card_author.text("Author: " + bookInfo.authors)
  card_author.addClass("card-author")
  card_pre.append(card_author)




 /*  const card = document.createElement('div');
  card.classList.add('card');
  const image = document.createElement('img');
  image.src = bookInfo.imageLinks;
  card.appendChild(image);
  const title = document.createElement('div');
  title.classList.add('book-title');
  title.textContent = bookInfo.title;
  card.appendChild(title);
  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = bookInfo.authors;
  card.appendChild(author);
  result_container.appendChild(card); */
}
run_book_api(input_value,category_type)
