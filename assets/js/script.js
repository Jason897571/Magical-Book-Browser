const page_transfer_btn = $(".page-transfer-btn");
const modal_sign_in_element = $(".sign-in-modal");
const modal_sign_in_close_element = $(".sign-in-close");
const modal_search_warning_element = $(".search-warning-close");
const nav_sign_in_element = $("#nav-sign-in");
const search_btn = $("#search-btn");
const search_input_box = $("#search-box");
const search_catagory_element = $("#search-category");
const footer_email_btn = $("#footer-email-btn");
const subject_demo_element = $(".subject-demo");
const qr_code_element = $(".qr-code");
const warning_text_element = $(".warning");


//modal elements
const sign_up_email_element = $("#email");
const sign_up_password_element = $("#password");
const sign_up_btn_element = $("#sign-up-btn");
const sign_in_btn_element = $("#sign-in-btn");

const demo_link = "https://jason897571.github.io/Magical-Book-Browser/"

// open sign in modal
open_sign_in_modal = function(){
	modal_sign_in_element.addClass("is-active");
}
//close sign modal
close_sign_in_modal = function(){
	modal_sign_in_element.removeClass("is-active");
}
// open searching warning modal for empty input
open_search_warning_modal = function(){
	$(".search-warning-modal").addClass("is-active");
}
// close searching warning modal for empty input
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
//add event to close the search warning modal
modal_search_warning_element.on("click",function(){
	close_search_warning_modal();
})
// footer sign up button function
footer_email_btn.on("click",function(){
	open_sign_in_modal();
})

// transfer to book.html and pass params
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

// transfer to result page to show demo subject
subject_demo_element.on("click",function(event){
	let target = event.target;
	if(target.classList.contains("code-card")){
		
		let topic = target.querySelector("h2.card-header").innerText;
		window.location.href = `book.html?input=${encodeURIComponent(topic)}&category=subject`
	}
});

page_transfer_btn.on("click", function(event){
	event.preventDefault();
	transfer_page();
})

//generate QR code for footer
qr_code_generator = function(info){
	
	const url = `https://quickchart.io/qr?text=${encodeURIComponent(info)}&centerImageUrl=https://cdn2.iconfinder.com/data/icons/magic-and-fairy-tale/512/Magic_Book-512.png`;
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

qr_code_generator(demo_link);

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
		if (is_localstorage_available()) {
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


	