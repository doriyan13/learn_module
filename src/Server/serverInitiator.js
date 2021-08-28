// Define express app to handle the API requests -
const express = require('express');
const app = express();

// Init the router handler: Use the apiHandler and add the '/api' to each route
const routes = require('./apiHandler');
app.use('/api',routes);

// Require cors - to be able send information between domains!
// *Notice that without it you will encounter an domain handling error
const cors = require('cors');

// Enable the use of jsons in requests and allow CORS - 
app.use(express.json({limit:'10mb'})); // Config that express will let me send a recive Json objects.
app.use(cors()); // Config the use of cors - to be able send information between domains!


// Define mongoose instance -
// DB name: learnModule
// Colleciton name: entity -> inside a schema model you define the collection that you want to save to.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/learnModule', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise; // Overriding the mongoose Promise because it's deprcated.

//------------------------------------------
// Define a DB instance to access the DB -
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" Succesfuly connected to DB ~");
});
//------------------------------------------
// Defining my server and connecting it to index.html:
const serverport = 8080;//the port in localhost to my server that going to do all the functions.
app.listen(serverport,()=>console.log(`Opening a Server in port ${serverport}`));//using EC6 to join variable to a string data


