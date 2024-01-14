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
const warning_text_element = $(".warning");
const qr_code_element = $(".qr-code");

// sign in modal
const sign_up_email_element = $("#email");
const sign_up_password_element = $("#password");
const sign_up_btn_element = $("#sign-up-btn");
const sign_in_btn_element = $("#sign-in-btn");

const demo_link = "https://jason897571.github.io/Magical-Book-Browser/"



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


// book api application here
run_book_api = function(user_input,category_type){
    // by author
    if(category_type=="inauthor"){
      var bookApi = `https://www.googleapis.com/books/v1/volumes?q=${user_input}+inauthor&maxResults=40`
    }//by book name
    else if(category_type=="intitle"){
      var bookApi = `https://www.googleapis.com/books/v1/volumes?q=${user_input}+intitle&maxResults=40`
    }// by subject
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
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

// extract data from api
function handleResponse(response) {
    for (var i = 0; i < response.items.length; i++) {
      var item = response.items[i];
      let bookInfo = {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        imageLinks: item.volumeInfo.imageLinks?.thumbnail,
        description: item.volumeInfo.description,
        infoLink:item.volumeInfo.infoLink,
        }
      // in production code, item.text should have the HTML entities escaped.
      createBookCard(bookInfo);
    }
}

// dynamically generates results cards
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
  card_image.attr("alt", "Image Not Avaliable")
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

qr_code_generator = function(info){
	
	const url = `https://quickchart.io/qr?text=${encodeURIComponent(info)}&centerImageUrl=https://cdn2.iconfinder.com/data/icons/magic-and-fairy-tale/512/Magic_Book-512.png`;
	const options = {
		method: 'GET'
         
	};

	fetch(url, options)
		.then(response => response)
		.then(response =>{
			qr_code_element.attr("src", response.url);
		} )

}

//check if localstorage is empty
is_localstorage_available = function(){
	let user_data = JSON.parse(localStorage.getItem("user-data"))
	if(user_data === null){
		return false;
	}
	else{
		return true;
	}
		
	
};

//check if there is matched user in localstorage
function check_user_credentials(input_email, input_password, user_data_list) {
    for (let i = 0; i < user_data_list.length; i++) {
        let user = user_data_list[i];
        if (user.email === input_email && user.password === input_password) {
            return true; // Match found
        }
    }
    return false; // No match found
}

// user sign up
sign_up = function(){
	// get input from user 
	let email_text = sign_up_email_element.val();
	let password_text = sign_up_password_element.val();

	//validate if it is empty
	if(email_text === "" || password_text === ""){
		warning_text_element.text("Please Fill In All Fields");
		return;
	}
	else{
		let user_data = {"email":email_text, "password":password_text}

		// if there are historical sign in data
		if (is_localstorage_available) {
            let storedData = localStorage.getItem("user-data");
            let user_data_list = JSON.parse(storedData);
            user_data_list.push(user_data);
            localStorage.setItem("user-data", JSON.stringify(user_data_list));
        } else {
            localStorage.setItem("user-data", JSON.stringify([user_data])); // Store as an array for consistency
        }

		close_sign_in_modal();

		nav_sign_in_element.text(`Hi! ${email_text}`);
		
	}
	
	
}

// user sign in
sign_in = function(){
	let email_text = sign_up_email_element.val();
	let password_text = sign_up_password_element.val();
	let user_data = JSON.parse(localStorage.getItem("user-data"));
	let is_user = check_user_credentials(email_text, password_text,user_data)

	if(is_user){
		close_sign_in_modal();

		nav_sign_in_element.text(`Hi! ${email_text}`);
	}else{
		warning_text_element.text("Your Email or Password Are Incorrect");
		return;
	}

}

sign_up_btn_element.on("click", function(){
	sign_up();
} )

sign_in_btn_element.on("click", function(){
	sign_in();
} )


qr_code_generator(demo_link)

// get data from main page
const input_value = (new URLSearchParams(window.location.search)).get('input');
const category_type = (new URLSearchParams(window.location.search)).get('category');
run_book_api(input_value,category_type)
