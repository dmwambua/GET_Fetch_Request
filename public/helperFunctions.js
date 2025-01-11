// Formats response to look presentable on the webpage
const renderResponse = (res) => {
    // Checks if the response (`res`) is falsy (e.g., null, undefined, etc.)
    if (!res) {
        console.log(res.status); // Logs the status of the response (if available) for debugging purposes
    }

    // Handles the case where the response is an empty array (no suggestions found)
    if (!res.length) {
        responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>"; // Displays a user-friendly message
        return; // Exits the function
    }

    // Creates an empty array to store HTML strings for word suggestions
    let wordList = [];

    // Loops through the response array, limiting to a maximum of 10 suggestions
    for (let i = 0; i < Math.min(res.length, 10); i++) {
        // Adds each word from the response as a list item in HTML format
        wordList.push(`<li>${res[i].word}</li>`);
    }

    // Joins the array of HTML strings into a single string
    wordList = wordList.join("");

    // Updates the `responseField` element to display a formatted list of suggestions
    responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
    return; // Ends the function
};

// Renders the raw response before it is formatted for display
const renderRawResponse = (res) => {
    // Extracts and limits the response to the first 10 items (if available)
    let trimmedResponse = res.slice(0, 10);

    // Updates the `responseField` element to display the raw JSON data as a string
    responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
};

// Renders the JSON object returned by the API in a readable format
const renderJsonResponse = (res) => {
    // Creates an empty object to store key-value pairs from the JSON response
    let rawJson = {};

    // Iterates through each key in the JSON object and adds it to `rawJson`
    for (let key in res) {
        rawJson[key] = res[key];
    }

    // Converts the JSON object into a string with added line breaks for readability
    rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n");

    // Updates the `responseField` element to display the formatted JSON string inside a `<pre>` tag (for preformatted text)
    responseField.innerHTML = `<pre>${rawJson}</pre>`;
};
