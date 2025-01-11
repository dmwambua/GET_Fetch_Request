// Information to reach API
const url = 'https://api.datamuse.com/words?sl='; // Base URL for the Datamuse API, which provides word suggestions based on a "sounds like" query

// Selects page elements
const inputField = document.querySelector('#input'); // Input field where the user types their query
const submit = document.querySelector('#submit'); // Submit button that triggers the search
const responseField = document.querySelector('#responseField'); // Field where the API response will be displayed

// Asynchronous function to fetch suggestions from the API
const getSuggestions = () => {
    const wordQuery = inputField.value; // Retrieves the user's input from the input field
    const endpoint = `${url}${wordQuery}`; // Constructs the full API endpoint using the base URL and user query

    // Makes a fetch request to the API
    fetch(endpoint, { cache: 'no-cache' }) // Ensures no cached data is used for fresh results
        .then(response => {
            if (response.ok) { // Checks if the HTTP response status is OK (status code 200-299)
                return response.json(); // Parses the JSON response if successful
            }
            throw new Error('Request failed!'); // Throws an error if the response is not OK
        }, networkError => {
            console.log(networkError.message); // Logs any network errors that occur during the request
        })
        .then(jsonResponse => {
            // Processes and displays the JSON response from the API
            renderResponse(jsonResponse); // Calls a function to render the processed response on the webpage
        });
}

// Clears previous results and displays new results to the webpage
const displaySuggestions = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Removes any existing child elements in the response field to clear previous results
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }

    getSuggestions(); // Calls the function to fetch and display new suggestions
};

// Adds an event listener to the submit button
submit.addEventListener('click', displaySuggestions); // Executes `displaySuggestions` when the submit button is clicked
