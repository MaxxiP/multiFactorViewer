const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25
    },
    mail:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 40
    },
    username:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25
    },
    secret:{
        type: String,
        required: true,
        selected: false,
        minLength: 5,
        maxLength: 100
    }
});

module.exports = mongoose.model("service", ServiceSchema);