const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = require('../entity/student');

// Create course Schema & model -
const CourseSchema = new Schema({
    sname:{
        type:String,
        required: [true,'sname is required']
    },
    name:{
        type:String,
        required: [true,'name is required']
    },
    number:{
        type:Number,
        required: [true,'number is required']
    },
    students:{
        type: Array,
        required: [false,'students isn\'t required'],
        default: false
    },
    lastUpdatedBy:{
        type:String,
        required: [true,'lastUpdatedBy is required']
    }
});

const Course = mongoose.model('course',CourseSchema,'entity');
module.exports = Course;