const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create student Schema & model -
const StudentSchema = new Schema({
    name:{
        type:String,
        required: [true,'name is required']
    },
    last_name:{
        type:String,
        required: [true,'last name is required']
    },
    password:{
        type:Number,
        required: [true,'password is required']
    },
    address:{
        type:String,
        required: [true,'address is required']
    },
    age:{
        type:Number,
        required: [true,'age is required']
    }
});

const Student = mongoose.model('student',StudentSchema);
module.exports = Student;