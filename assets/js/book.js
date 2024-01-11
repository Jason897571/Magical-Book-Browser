const modal_sign_in_element = $(".sign-in-modal")
const modal_sign_in_close_element = $(".sign-in-close")
const nav_sign_in_element = $("#nav-sign-in")
const page_transfer_btn = $(".page-transfer-btn");
const search_input_box = $("#search-box");
const search_catagory_element = $("#search-category");
const footer_email_btn = $("#footer-email-btn");
let book_image = document.querySelector(".book-image")
let book_name = document.querySelector(".book-name")
let book_author = document.querySelector(".book-author")
let result_container= $(".result-container")




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

footer_email_btn.on("click",function(){
	open_sign_in_modal();
})

transfer_page = function(){
	let input_value = search_input_box.val();
	let category_value = search_catagory_element.val();

	if(input_value == ""){
		//popping up a modal
		open_search_warning_modal();
	}else{
		// transfer to another page to show result
		window.location.href = `book.html?input=${encodeURIComponent(input_value)}&category=${encodeURIComponent(category_value)}`
	}
	
}

page_transfer_btn.on("click", function(event){
	event.preventDefault();
	transfer_page();
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
  console.log(response);
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      let bookInfo = {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        imageLinks: item.volumeInfo.imageLinks.thumbnail,
        description: item.volumeInfo.description,
        infoLink:item.volumeInfo.infoLink,
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
  //create book info holder
  const book_info = $("<div></div>")
  book_info.addClass("book-info")
  card_pre.append(book_info)
  //create author info
  const card_author = $("<p></p>")
  card_author.text("Author: " + bookInfo.authors)
  card_author.addClass("card-author")
  book_info.append(card_author)

  //create more info button
  const more_info_btn = $("<button>More Info</button>");
  more_info_btn.addClass("more-info-btn");
  book_info.append(more_info_btn);
  more_info_btn.on("click", function(){
    window.location.href = bookInfo.infoLink;
  })


  

}

// get data from main page
const input_value = (new URLSearchParams(window.location.search)).get('input');
const category_type = (new URLSearchParams(window.location.search)).get('category');
run_book_api(input_value,category_type)
