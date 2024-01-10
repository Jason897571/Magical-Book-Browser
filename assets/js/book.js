const modal_sign_in_element = $(".sign-in-modal")
const modal_sign_in_close_element = $(".sign-in-close")
const nav_sign_in_element = $("#nav-sign-in")


let book_image = document.querySelector(".book-image")
let book_name = document.querySelector(".book-name")
let book_author = document.querySelector(".book-author")
let result_container= document.querySelector(".result-container")

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


// add book name,image, author,catagory below
display_book = function(image,name,author,catagory){
    book_name.textContent = name;
    book_image.attr("src",image);
    book_author.textContent = author;
    book_catagory.textContent = catagory;
    // add more data here
}




// need to use book api here
run_book_api = function(user_input,category_type){
	// use the api here
}