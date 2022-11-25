/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', processData);

// Function to generate data on click
function processData(e) {

    // Base url for our api on OpenWeatherMap
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    // Zip code provided by the user
    const zipCode = document.getElementById('zip').value;
    // By default the country code is US
    const countryCode = ',us';
    // Variable to link with key and the base url
    const appIdQuery = '&appId=';
    // Api key
    const apiKey = 'something';
    // Get user response about feelings
    const user_response = document.getElementById('feelings').value;

    //Chained Promises to get weather data and post data entered by the user
    getWeatherData(baseURL + zipCode + countryCode + appIdQuery + apiKey)
        .then(function (data) {
            console.log(data);
            postWeatherData('/addData', { temperature: data.main.temp, date: newDate, user_response: user_response })

            //Calling the function to update the UI
            updateUI();
        });
}

// Async GET Function to get Data from our API endpoint
const getWeatherData = async (url) => {

    const res = await fetch(url)
    try {
        const data = await res.json();
        // console.log(data.main.temp);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


// Async POST Fubction to post data to an endpoint
const postWeatherData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


// Async function to update the UI
const updateUI = async () => {

    const request = await fetch('/data');

    try {

        const allData = await request.json();
        // set text to our HTML by getting data from our request
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)} degrees`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.user_response}`;

    } catch (error) {

        console.log('error', error);

    }
}