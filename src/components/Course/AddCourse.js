import React, { useState } from 'react';
import Card from '../UI/Card'
import Button from '../UI/Button'
import Select from 'react-select'

import classes from './AddCourse.module.css'

// Import Axios to be able to make an POST/GET request -
import Axios from 'axios';
// Define a const that will hold the API route to add a student, this way if we will need to update the route we only update it once!
const getAllStudentAPI = "http://localhost:8080/api/GetAllStudents";
const addCourseAPI = "http://localhost:8080/api/AddCourse";

// I make the annonymous function async so i can use await to make sure i get my promise from Axios:
const AddCourse = (props) => {

  // Define States that will hold the data in the form -
  const [courseName, setName] = useState("");
  const [courseNumber, setLastName] = useState("");
  const [courseStudents, setStudents] = useState("");

  const courseNameHandler = (event) => {
    setName(event.target.value);
  };
  const courseNumberHandler = (event) => {
    setLastName(event.target.value);
  };
  const courseStudentsHandler = (event) => {
    const arr = [...event];
    console.log("this is arr:"+arr);
    console.log("this is event: " + event);
    setStudents(arr);
  };

  // Define an array that will hold all the list of current student in the DB -
  const studentOptions = [];

  // Define a async function that will hold all the students: 
  const getStudents = async (studentOptions) => {
    // Post-request that will get me the list of students:
    // Notice that the best practice will be to use a GET request but i prefered to show the handling of a POST request -
    const result = await Axios.post(getAllStudentAPI);
    // DEBUG - show you that you do get a result-
    //console.log("result: " + result.data.arrOfStudents);

    // arrData - will hold the array of students that i get a result -
    const arrData = result.data.arrOfStudents;
    // Loop througthout the array and print and save the results as options -
    arrData.forEach( (student) => {
      console.log("name: "+ student.name + ",id: "+ student._id);
      studentOptions.push({value: student._id, label: (student.name +" "+ student.last_name)});
    });
  };

  // Initiate the function that will fill my studentOptions: 
  getStudents(studentOptions);

  const addCourseHandler = (event) => {
    event.preventDefault();
    // Check if the user filled all the required data!
    if (courseName !== "" && courseNumber !== "") {
        //event.preventDefault(); // -> if you want to debugg and see all the logs here!
      // I log all the parts of the form to display i indeed get all the needed info 
      // Notice it's just for DEBUG purpose and in the final code you need to REMOVE all of those irrelavent logs!
      console.log("Current Student name: " + courseName);
      console.log("Current Student last name: " + courseNumber);
      console.log("Current Student arr: " + courseStudents);

      // Create a variable that will hold the current TimeStamp of the update -
      let currTime = new Date().getTime();
      console.log("Current timestamp: " + currTime);

      // Send a post request to the AddStudent API to enter a new entry in my mongo:
      // Axios.post(addCourseAPI,{
      //   name: courseStudents,
      //   number: courseNumber,
      //   students: courseStudents,
      //   lastUpdatedBy: currTime
      // }).then((response) => {
      // //   // *Notice that .then is old JS sentex to handle promises but still exist and handy to handle the response that
      // //     // you will get from the post request!
      //   console.log(response);
      // });
    }
    else {
      event.preventDefault(); //prevent refreshing the page. - if the data isn't vaild i want the user to fix it!
      // Notice this is just some basic check if you get a vaild student, in real projects you will have to do more advance validations -
      console.log("Unvalid Course, please fill all the fields");
    }
  }

  return (
    <Card className={classes.input}>
      <form onSubmit={addCourseHandler}>
        <label htmlFor="name" >Course Name</label>
        <input id="name" type="text" onChange={courseNameHandler} />
        <label htmlFor="number" >Course Number</label>
        <input id="number" type="text" onChange={courseNumberHandler} />
        <label htmlFor="students" >Students</label>
        <Select name="studentList" isMulti options={studentOptions} className="basic-multi-select" classNamePrefix="select" onChange={courseStudentsHandler} />

        <Button type="submit">Add Course</Button>
      </form>
    </Card>
  );
};

export default AddCourse;