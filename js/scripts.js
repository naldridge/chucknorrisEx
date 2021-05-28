'use strict';
const getQuote = document.querySelector('#getQuote');
const lookAtCategory = document.querySelector('#categoryList');
//XHR Example
/* const request = new XMLHttpRequest();
request.onreadystatechange = function () {
    console.log(this);
    if(this.readyState === 4) {
        console.log("XHR Response is: ", this.response);
    }
}
request.open('GET', 'https://api.chucknorris.io/jokes/random?category=dev');
request.send(); */

function fetchTheQuote(category) {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`
    ).then(function (response) {
        console.log("Fetch Response is: ", response);
        return response.json();
    }).then(function (data) {
        updateQuote(data);
    });
}

function fetchTheCategories() {
    fetch('https://api.chucknorris.io/jokes/categories').then(function (response) {
    return response.json();
    }).then(function (data) {
    
        updateCategories(data);
    });

}

const chuckQuote = document.querySelector('#chuckQuote');

function updateQuote(data) {
    const theQuote = data.value;
    console.log(theQuote);
    chuckQuote.innerText = theQuote;

}

function updateCategories(categoryData) {
    const selectElement = document.createElement('select');
    categoryData.forEach(function(category) {
        const categoryOptionElement = document.createElement('option');
        categoryOptionElement.value = category;
        categoryOptionElement.text = category;
        selectElement.appendChild(categoryOptionElement);
    });
    lookAtCategory.appendChild(selectElement);

    selectElement.addEventListener('change', function (event) {
        console.log('The Event is :', event.target.value);
        const categoryName = event.target.value;
        fetchTheQuote(categoryName);
    })
}

getQuote.addEventListener('click', function () {
    fetchTheQuote();
});

fetchTheQuote('animal');
fetchTheCategories();