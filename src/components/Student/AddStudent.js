import React from 'react';
import Card from '../UI/Card'
import Button from '../UI/Button'
import classes from './AddStudent.module.css'

const AddStudent = (props) => {

  const addStudentHandler = (event) => {
    event.preventDefault();
  }

  return (
    <Card className = {classes.input}>
      <form onSubmit={addStudentHandler}>
        <label htmlFor="name" >Student Name</label>
        <input id="name" type="text" />
        <label htmlFor="last_name" >Student Last Name</label>
        <input id="last_name" type="text" />
        <label htmlFor="password" >Password</label>
        <input id="password" type="text" />
        <label htmlFor="address" >Address</label>
        <input id="address" type="text" />
        <label htmlFor="age" >Age</label>
        <input id="age" type="text" />

        <Button type="submit">Add Student</Button>
      </form>
    </Card>
  );
};

export default AddStudent;