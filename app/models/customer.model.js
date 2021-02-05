const mongoose = require('mongoose');

const Customer = mongoose.model(
    'Customer',
    new mongoose.Schema({
        name:String,
        phone:Number,
        dob:Date,
        city:String,
        gender:String,
        bike:String,
        car:String,
        laptop:String,
        mobile:String        
    })
);

module.exports = Customer;