// Define express router to handle the API requests -
const express = require('express');
const router = express.Router();

/* Because i'm using cross origin resourse (aka using multiple ports for the same domain) you will encounter an CORS error
 to handle that you will need to use the CORS package and allow CORS, but even after doing so you will still get some errors
 the reasoning for that is that you enabled CORS for the app handling and not the route handling thus you will need to
 handle it also by doing that -*/
const cors = require('cors');
router.all('*', cors());
//-----------------------------------------
// Require the Schemas that I want to save to the DB -
const Student = require('../../entity/student');
const Course = require('../../entity/course');
//-----------------------------------------
// Handle Requests:

// Insert a new student to the DB
router.post('/AddStudent', async (req, res) => {
    console.log(req.body); // Debug - show the data that you got.
    // Adding via Student model the new entry to the DB -
    // *Notice that i added a 'await' before the action because this method is a Promise thus
    //   to make sure that i post after i saved the data then i can add await to the promise to return.    
    await Student.create(req.body);

    // Returning a POST request to display what i saved to the DB - (inside data you will get this values)
    res.send({
        type: 'POST',
        name: req.body.name,
        last_name: req.body.last_name,
        password: req.body.password,
        address: req.body.address,
        age: req.body.age
    });
    res.end();
});

// Insert a new course to the DB
router.post('/AddCourse', async (req, res) => {
    //console.log(req);
    console.log("thhis is what i get: " + req.body); // Debug - show the data that you got.
    // Adding via Course model the new entry to the DB -
    // *Notice that i added a 'await' before the action because this method is a Promise thus
    //   to make sure that i post after i saved the data then i can add await to the promise to return.    
    await Course.create(req.body);

    // Returning a POST request to display what i saved to the DB - (inside data you will get this values)
    res.send({
        type: 'POST',
        name: req.body.name,
        number: req.body.number,
        students: req.body.students
    });
    res.end();
});

// An API request that will return all the students that match the name and the last_name was given -
router.post('/GetStudent', async (req, res) => {
    // Query Example-
    // This function will go to the mongo and fetch all the students that have this name and last name -
    let arrOfStudents = await Student.find({
        name: req.body.name,
        last_name: req.body.last_name
    });
    // For DEBUG purposes i print the results and display the first student in the answer id:
    console.log("wanted student: " + arrOfStudents);
    console.log("first student ID: " + arrOfStudents[0]._id);
    // If the answer isn't empty then i shall return the whole array of result in 'arrOfStudents'
    if (arrOfStudents != undefined && arrOfStudents != null) {
        res.send({
            type: 'POST',
            arrOfStudents: arrOfStudents
        });
    }
    res.end();
});

// An API request that will return all the students -
router.post('/GetAllStudents', async (req, res) => {
    // This function will go to the mongo and fetch all the students -
    let arrOfStudents = await Student.find();
    // For DEBUG purposes i print the results and display the first student in the answer id:
    console.log("test: " + arrOfStudents);
    // If the answer isn't empty then i shall return the whole array of result in 'arrOfStudents'
    if (arrOfStudents != undefined && arrOfStudents != null) {
        res.send({
            type: 'POST',
            arrOfStudents: arrOfStudents
        });
    }
    res.end();
});

// If you were Wondering how can you remove a student this is the way:
// router.delete('/DeleteStudent', async (req,res) => {
//   let studentToDelete = await Student.find({
//                 name:req.body.name,
//                 last_name:req.body.last_name
//   });
//  Student.findByIdAndRemove(_id:studentToDelete[0]._id);
// });
// *Notice - update working almost the same but you will need to use PUT instead of DELETE!**

module.exports = router;