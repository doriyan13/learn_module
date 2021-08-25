// Define express app to handle the API requests -
const express = require('express');
const app = express();

// Define mongoose instance -
// DB name: learnModule
// Colleciton name: entity
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/learnModule', {useNewUrlParser: true, useUnifiedTopology: true});

//------------------------------------------
// Define a db instance to access the DB -
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" Succesfuly connected to DB ~");
});
//------------------------------------------
// Defining my server and connecting it to index.html:
const serverport = 8080;//the port in localhost to my server that going to do all the functions.
app.listen(serverport,()=>console.log(`Opening a Server in port ${serverport}`));//using EC6 to join variable to a string data

app.use(express.json({limit:'10mb'}));

//-----------------------------------------
// Require the Schemas that i want to save to the DB -
const Student = require('../../entity/student');
const Course = require('../../entity/course');

//-----------------------------------------
// Handle Requests:
app.post('/api/AddStudent', (req,res)=>{   
    console.log(req.body); // Debug - show the data that you got.
    // Adding via Student model the new entry to the DB -
    // *Notice that i added a 'await' before the action because this method is a Promise thus
    //   to make sure that i post after i saved the data then i can add await to the promise to return.
    await Student.create(req.body);
    // Returning a POST request to display what i saved to the DB -
    res.send({
      type:'POST',
      name:req.body.name,
      last_name:req.body.last_name,
      password: req.body.password,
      address:req.body.address,
      age:req.body.age
    });
    res.end();
});