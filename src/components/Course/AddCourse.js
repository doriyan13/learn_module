import React from 'react';
import Card from '../UI/Card'
import Button from '../UI/Button'
import Select from 'react-select'

import classes from './AddCourse.module.css'

const AddStudent = (props) => {

  //Temp: TODO - fix it to get from mongo!
  const studentOptions = [
    {value: 'student1', label: 'דוד'},
    {value: 'student2', label: 'שלומי'},
    {value: 'student3', label: 'רון'}
  ];

  const addCourseHandler = (event) => {
    event.preventDefault();
  }

  return (
    <Card className = {classes.input}>
      <form onSubmit={addCourseHandler}>
        <label htmlFor="name" >Course Name</label>
        <input id="name" type="text" />
        <label htmlFor="number" >Course Number</label>
        <input id="number" type="text" />
        <label htmlFor="students" >Students</label>
        <Select name = "studentList" isMulti  options = {studentOptions} className = "basic-multi-select" classNamePrefix = "select" />

        <Button type="submit">Add Course</Button>
      </form>
    </Card>
  );
};

export default AddStudent;