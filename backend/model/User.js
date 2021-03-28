const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
    role:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    services:{
        type: Array
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("user", UserSchema);