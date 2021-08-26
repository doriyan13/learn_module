import React, { useState } from 'react';
import Card from '../UI/Card'
import Button from '../UI/Button'
import classes from './AddStudent.module.css'

// Import Axios to be able to make an POST/GET request -
import Axios from 'axios';
// Define a const that will hold the API route to add a student, this way if we will need to update the route we only update it once!
const addStudentAPI = "http://localhost:8080/api/AddStudent";
const getAllStudentAPI = "http://localhost:8080/api/GetAllStudents";


const AddStudent = (props) => {

  // Define States that will hold the data in the form -
  const [studentName, setName] = useState("");
  const [studentLastName, setLastName] = useState("");
  const [studentPassword, setPassword] = useState("");
  const [studentAddress, setAddress] = useState("");
  const [studentAge, setAge] = useState("");

  const studentNameHandler = (event) => {
    setName(event.target.value);
  };
  const studentLastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const studentPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const studentAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const studentAgeHandler = (event) => {
    setAge(event.target.value);
  };

  // Function that will handle onSubmit event:
  const addStudentHandler = (event) => {
    // Check if the user filled all the required data!
    if (studentName !== "" && studentLastName !== "" && studentPassword !== "" &&
      studentAddress !== "" && studentAge !== "") {
        //event.preventDefault(); // -> if you want to debugg and see all the logs here!
      // I log all the parts of the form to display i indeed get all the needed info 
      // Notice it's just for DEBUG purpose and in the final code you need to REMOVE all of those irrelavent logs!
      console.log("Current Student name: " + studentName);
      console.log("Current Student last name: " + studentLastName);
      console.log("Current Student password: " + studentPassword);
      console.log("Current Student address: " + studentAddress);
      console.log("Current Student age: " + studentAge);

      // Create a variable that will hold the current TimeStamp of the update -
      let currTime = new Date().getTime();
      console.log("Current timestamp: " + currTime);

      // Send a post request to the AddStudent API to enter a new entry in my mongo:
      Axios.post(addStudentAPI,{
        name: studentName,
        last_name: studentLastName,
        password: studentPassword,
        address: studentAddress,
        age: studentAge,
        lastUpdatedBy: currTime
      }).then((response) => {
      //   // *Notice that .then is old JS sentex to handle promises but still exist and handy to handle the response that
      //     // you will get from the post request!
        console.log(response);
      });
    }
    else {
      event.preventDefault(); //prevent refreshing the page. - if the data isn't vaild i want the user to fix it!
      // Notice this is just some basic check if you get a vaild student, in real projects you will have to do more advance validations -
      console.log("Unvalid Student, please fill all the fields");
    }
  }

  return (
    <Card className={classes.input}>
      <form onSubmit={addStudentHandler}>
        <label htmlFor="name" >Student Name</label>
        <input id="name" type="text" onChange={studentNameHandler} />
        <label htmlFor="last_name" >Student Last Name</label>
        <input id="last_name" type="text" onChange={studentLastNameHandler} />
        <label htmlFor="password" >Password</label>
        <input id="password" type="text" onChange={studentPasswordHandler} />
        <label htmlFor="address" >Address</label>
        <input id="address" type="text" onChange={studentAddressHandler} />
        <label htmlFor="age" >Age</label>
        <input id="age" type="text" onChange={studentAgeHandler} />

        <Button type="submit">Add Student</Button>
      </form>
    </Card>
  );
};

export default AddStudent;