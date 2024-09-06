function fetch_header(header='header.html') {
	console.log("test")
	console.log(header)
	fetch(header)
	.then(response => response.text())
	.then(data => document.getElementById('header').innerHTML = data)
	.catch(error => console.error('Error loading header:', error));
}