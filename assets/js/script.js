let qr_code_element = $(".qr-code")
let page_transfer_btn = $(".page-transfer-btn")


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

qr_code_generator("book")
page_transfer_btn.on("click", function(){transfer_page("Magical Book")})
	