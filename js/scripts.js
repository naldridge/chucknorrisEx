'use strict';

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
    console.log(this);
    if(this.readyState === 4) {
        console.log("XHR Response is: ", this.response);
    }
}
request.open('GET', 'https://api.chucknorris.io/jokes/random?category=dev');
request.send();

const fetchRequest = fetch(
    'https://api.chucknorris.io/jokes/random?category=dev'
    ).then(function(response) {
        console.log("Fetch Response is: ",response);
        return response.json();
    }).then(function(data) {
        console.log("Data is: ", data);
    });
