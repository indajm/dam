// Import express
var express = require('express');
var app = express();

// The frontend will be server in a different port than the backend, so I need CORD to communicate between those servers
var cors = require('cors');
var corsConfig={ origin: '*', optionSucessStatus:200 };
app.use(cors(corsConfig));

// Define port for printing message when the API is working
var PORT = 3000;

// Declare paths to folders dispositivo and medicion. Get a Router object:
var routerDisp = require('./routes/dispositivo');
var routerMedicion = require('./routes/medicion');
//var routerRiego = require('./routes/riego');
//var routerElectrovalvula = require('./routes/electrovalvula');

// The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, Express will execute the functions you passed to app.use() in order.

// express.json() parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//app.get('/', (req, res) => res.send('Hello World!'));

// Define the routes for files index.js from routes/dispositivo and routes/medicion:
// First case:
app.use('/dispositivo', routerDisp);

// For the measurements, we will use the same first part of the link. For example, http://localhost:8000/dispositivo/1/mediciones
app.use('/dispositivo', routerMedicion);
//app.use('/api/riego', routerRiego);
//app.use('/api/electrovalvula', routerElectrovalvula;

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});