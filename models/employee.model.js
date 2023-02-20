const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    dob: {
        type:  String,
        required: 'This field is required.'
    },
    gender: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    mobile: {
        type: Number,
        required: 'This field is required.'
    }
});

employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

employeeSchema.path('dob').validate((val) => {
    var date = new Date(val);
    var cont = date.getFullYear();
    var curDate = new Date().getFullYear();

    var dob = curDate - cont;

    if(dob >= 12) { return true}
    else { return false } 
}, 'Age must be above 12years.');

mongoose.model('Employee',employeeSchema);