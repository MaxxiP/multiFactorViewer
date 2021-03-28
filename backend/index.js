const express = require("express");
const session = require("express-session");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user");
const service = require('./routes/service');
const auth = require('./routes/auth');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

InitiateMongoServer();

const app = express(); 

const store = new MongoDBStore({
    uri: process.env.STOREURI,
    collection: 'userSessions'
});

store.on('error', function(error){
    console.log(error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: process.env.SESS_NAME,
    resave: false, 
    saveUninitialized: false,
    secret: process.env.SESS_SECRECT,
    cookie: {
        httpOnly: true,
        maxAge: Number(process.env.SESS_LIFETIME), 
        sameSite: true,
        secure: false
    },
    store: store
}));

app.use('/user', user);
app.use('/service', service);
app.use('/auth', auth);
app.use(function (req, res, next) {
    res.status(404).send("There is nothing to be seen!")
});

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server started on port ${process.env.PORT}`);
}); 