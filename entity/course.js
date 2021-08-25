const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = require('../entity/student');

// Create course Schema & model -
const CourseSchema = new Schema({
    name:{
        type:String,
        required: [true,'name is required']
    },
    number:{
        type:Number,
        required: [true,'last name is required']
    },
    students:{
        type: [student],
        required: [false,'students isn\'t required'],
        default: false
    }
});

const Course = mongoose.model('course',CourseSchema);
module.exports = Course;