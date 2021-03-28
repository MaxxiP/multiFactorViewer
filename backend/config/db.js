const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(process.env.MONGURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true            
        });
        console.log("Connection to DB established");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = InitiateMongoServer; 