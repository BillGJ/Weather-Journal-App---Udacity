// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
// Require body-parser
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Setting up the port
const port = 8000;

// Make the app listen to the set port
const server = app.listen(port, listening);

// listening Callback function
function listening() {
    console.log('Server running on localhost')
    console.log(`Listening to port: ${port}`);
}

// Get data route
app.get("/data", sendData);

function sendData(req, res) {
    console.log('project data');
    console.log(projectData);
    res.send(projectData);
};

//Post data route
app.post('/addData', addData);

function addData(req, res) {

    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        user_response: req.body.user_response
    }

    projectData = newEntry;
    console.log('data server');
    console.log(projectData);

}