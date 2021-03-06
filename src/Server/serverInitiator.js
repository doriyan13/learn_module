// Define express app to handle the Server-side:
const express = require('express');
const app = express();

// Require cors - to be able send information between domains!
// *Notice that without it you will encounter an domain handling error
const cors = require('cors');

// Enable the use of jsons in requests and allow CORS - 
app.use(express.json({limit:'10mb'})); // Config that express will let me send a recive Json objects.
app.use(cors()); // Config the use of cors - to be able send information between domains!

// Init the router handler: Use the apiHandler and add the '/api' to each route
const routes = require('./apiHandler');
app.use('/api',routes);

// Define mongoose instance -
// DB name: learnModule
// Colleciton name: entity -> inside a schema model you define the collection that you want to save to.
const mongoose = require('mongoose');
// Switch between if you want to run locally or Container based -
const DB_LOCAL_API = 'mongodb://localhost:27017/learnModule';
const DB_DOCKER_API = 'mongodb://mongo:27017/learnModule';
mongoose.connect(DB_LOCAL_API, {useNewUrlParser: true, useUnifiedTopology: true});
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
const serverport = 8585;//the port in localhost to my server that going to do all the functions.
app.listen(serverport,()=>console.log(`Opening a Server in port ${serverport}`));//using EC6 to join variable to a string data