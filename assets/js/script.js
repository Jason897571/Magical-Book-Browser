let qr_code_element = $(".qr-code")
let info = ``
const url = `https://quickchart.io/qr?text=${encodeURIComponent(info)}&centerImageUrl=https://assetstorev1-prd-cdn.unity3d.com/key-image/9c3bffdf-a21b-4e08-94d5-63d5bbc3528b.jpg`;
const options = {
	method: 'GET'

};

fetch(url, options)
	.then(response => response)
	.then(response => qr_code_element.attr("src", response.url))
	