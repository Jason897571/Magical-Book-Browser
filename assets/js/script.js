const page_transfer_btn = $(".page-transfer-btn");
const modal_sign_in_element = $(".sign-in-modal");
const modal_sign_in_close_element = $(".sign-in-close");
const modal_search_warning_element = $(".search-warning-close");
const nav_sign_in_element = $("#nav-sign-in");
const search_btn = $("#search-btn");
const search_input_box = $("#search-box");
const search_catagory_element = $("#search-category");
const footer_email_btn = $("#footer-email-btn");

// open sign in modal
open_sign_in_modal = function(){
	modal_sign_in_element.addClass("is-active");
}
//close sign modal
close_sign_in_modal = function(){
	modal_sign_in_element.removeClass("is-active");
}

open_search_warning_modal = function(){
	$(".search-warning-modal").addClass("is-active");
}

close_search_warning_modal = function(){
	$(".search-warning-modal").removeClass("is-active");
}

// add event to open the sign in modal
nav_sign_in_element.on("click",function(){
	open_sign_in_modal();
})

//add event to close the sign in modal
modal_sign_in_close_element.on("click",function(){
	close_sign_in_modal();
})

modal_search_warning_element.on("click",function(){
	close_search_warning_modal();
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


qr_code_generator = function(info){
	
	const url = `https://quickchart.io/qr?text=${encodeURIComponent(info)}&centerImageUrl=https://images.squarespace-cdn.com/content/v1/598a797af5e23155afc4d592/1597998089824-UHZER996H8NB5EYYDFIW/AVI.JPG`;
	const options = {
		method: 'GET'
         
	};

	fetch(url, options)
		.then(response => response)
		.then(response =>{
			console.log(response);
			qr_code_element.attr("src", response.url);
		} )

}


	