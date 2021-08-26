// Define express app to handle the API requests -
const express = require('express');
const app = express();

// Require cors - to be able send information between domains!
// *Notice that without it you will encounter an domain handling error
const cors = require('cors');

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

app.use(express.json({limit:'10mb'})); // Config that express will let me send a recive Json objects.
app.use(cors()); // Config the use of cors - to be able send information between domains!

//-----------------------------------------
// Require the Schemas that I want to save to the DB -
const Student = require('../../entity/student');
const Course = require('../../entity/course');

//-----------------------------------------
// Handle Requests:

// Insert a new student to the DB
app.post('/api/AddStudent', async (req,res)=>{   
    console.log(req.body); // Debug - show the data that you got.
    // Adding via Student model the new entry to the DB -
    // *Notice that i added a 'await' before the action because this method is a Promise thus
    //   to make sure that i post after i saved the data then i can add await to the promise to return.    
    await Student.create(req.body);

    // Returning a POST request to display what i saved to the DB - (inside data you will get this values)
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

// An API request that will return all the students that match the name and the last_name was given -
app.post('/api/GetStudent', async (req,res)=>{   

  // This function will go to the mongo and fetch all the students that have this name and last name -
  let arrOfStudents = await Student.find({
              name:req.body.name,
              last_name:req.body.last_name
            });
  // For DEBUG purposes i print the results and display the first student in the answer id:
  console.log("wanted student: " + arrOfStudents);
  console.log("first student ID: " + arrOfStudents[0]._id);

  // If the answer isn't empty then i shall return the whole array of result in 'arrOfStudents'
  if(arrOfStudents != undefined && arrOfStudents != null){
    res.send({
      type:'POST',
      arrOfStudents: arrOfStudents
    });  
  }
  res.end();
});

// An API request that will return all the students -
app.post('/api/GetAllStudents', async (req,res)=>{   

  // This function will go to the mongo and fetch all the students -
  let arrOfStudents = await Student.find();
  // For DEBUG purposes i print the results and display the first student in the answer id:
  console.log("test: " + arrOfStudents);

  // If the answer isn't empty then i shall return the whole array of result in 'arrOfStudents'
  if(arrOfStudents != undefined && arrOfStudents != null){
    res.send({
      type:'POST',
      arrOfStudents: arrOfStudents
    });  
  }
  res.end();
});

// If you were Wondering how can you remove a student this is the way:
// app.delete('/api/DeleteStudent', async (req,res) => {
//   let studentToDelete = await Student.find({
//                 name:req.body.name,
//                 last_name:req.body.last_name
//   });
//  Student.findByIdAndRemove(_id:studentToDelete[0]._id);
// });