/* let qr_code_element = $(".qr-code") */
/* let page_transfer_btn = $(".page-transfer-btn") */
const modal_sign_in_element = $(".sign-in-modal")
const modal_sign_in_close_element = $(".sign-in-close")
const nav_sign_in_element = $("#nav-sign-in")
const search_btn = $("#search-btn")



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




transfer_page = function(book_name){
	window.location.href = `book.html?book_name=${encodeURIComponent(book_name)}`
}

qr_code_generator = function(info){
	
	const url = `https://quickchart.io/qr?text=${encodeURIComponent( info)}&centerImageUrl=https://images.squarespace-cdn.com/content/v1/598a797af5e23155afc4d592/1597998089824-UHZER996H8NB5EYYDFIW/AVI.JPG`;
	const options = {
		method: 'GET'
         
	};

	// qr_code_element.attr("src", url)

	fetch(url, options)
		.then(response => response)
		.then(response =>{
			console.log(response);
			qr_code_element.attr("src", response.url)
		} )

}

/* qr_code_generator("book") */
/* page_transfer_btn.on("click", function(){transfer_page("Magical Book")}) */
	