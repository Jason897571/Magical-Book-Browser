let book_image = document.querySelector(".book-image")
let book_name = document.querySelector(".book-name")
let book_author = document.querySelector(".book-author")
let back_btn = document.querySelector(".back-btn")

// get data from main page
const url_params = (new URLSearchParams(window.location.search)).get('input_value');



// add book name,image, author,catagory below
show_book = function(image,name,author,catagory){
    book_name.textContent = name;
    book_image.attr("src",image);
    book_author.textContent = author;
    book_catagory.textContent = catagory;
    // add more data here
}


back_btn.on("click", function(){window.history.back()})

// need to use book api here
