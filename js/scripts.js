'use strict';

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
document.addEventListener('DOMContentLoaded', function () {
    const getQuote = document.querySelector('#getQuote');
    const lookAtCategory = document.querySelector('#categoryList');
    const chuckQuote = document.querySelector('#chuckQuote');
    const defaultCategory = 'dev';
    let currentCategory = defaultCategory;
    


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

    function updateQuote(data) {
        const theQuote = data.value;
        console.log(theQuote);
        chuckQuote.innerText = theQuote;

    };

    function updateCategories(categoryData) {
        const selectElement = document.createElement('select');
        const filteredList = categoryData.filter(function(category) {
            if (category !== 'explicit' && category !== 'political' && category !== 'sport') {
                return category;
            }
        })

        
    

        filteredList.forEach(function (category) {
            const categoryOptionElement = document.createElement('option');
            categoryOptionElement.value = category;
            categoryOptionElement.text = category;
            if (category === currentCategory) {
                categoryOptionElement.setAttribute('selected', true);
            }
            selectElement.appendChild(categoryOptionElement);
        });

        lookAtCategory.appendChild(selectElement);

        selectElement.addEventListener('change', function (event) {
            console.log('The Event is :', event.target.value);
            const newcategoryName = event.target.value;
            currentCategory = newcategoryName;
            fetchTheQuote(currentCategory);
        });
    };

    getQuote.addEventListener('click', function () {
        fetchTheQuote(currentCategory);
    });

    fetchTheQuote(currentCategory);
    fetchTheCategories();
});











