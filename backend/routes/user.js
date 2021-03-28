const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const InputMiddleware = require('../middlewares/inputMiddleware');
const AuthMiddleware = require('../middlewares/authMiddleware');

const User = require("../model/User");
 
router.get('/users', AuthMiddleware.isAuthed,async(req, res) => {
    try {
        User.find().exec((err, data) => {
            if(err) throw err; 

            res.status(200).json(data);
        });
    } catch (err) { 
        console.error(err);
    } 
});

router.get('/user/:id', AuthMiddleware.isAuthed,async(req, res) => {
    try { 
        let userId = req.params.id;

        User.findOne({ _id: userId })
        .exec((err, data) => {
            if(err) throw err;

            res.status(200).json(data);
        });

    } catch (err) {
        console.log('An error occured on getting data for a specific user');
        console.error(err);
    }
});

router.patch('/user/password', AuthMiddleware.isAuthed, async(req,res) => {
    try {
        const { newPassword, confirmPassword, oldPassword } = req.body;
        const userID = req.session.user._id;

        if(req.session.user._id && (newPassword == confirmPassword)){

            let user = await User.findOne({ 
                _id: userID
            }).select('+password').lean();
            
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if(!isMatch){
                return res.status(409).send({ error: "Wrong Password!"});
            }else{
    
                bcrypt.genSalt(12, function(err, salt) {
                    bcrypt.hash(newPassword, salt, function(err, hash) {
                        user.password = hash;

                        User.findOneAndUpdate({ _id: userID}, user, { useFindAndModify: false, new: true }).then((user) => {
                            return res.status(200).send({ message: "Password successfully changed" });
                        }).catch((err) => {
                            console.log(err);
                            return res.send(409).send({ error: 'An error on retrieving user information occured' });
                        });

                    });
                });

            }
        }else{
            return res.status(200).send({ error: "Passwords do not match!"});
        }
    } catch (error) {
        console.error(error);
        return res.status(409).send({ error: 'Something went wrong changing the password.', error: error});
    }
})

router.patch('/user/:id', [InputMiddleware.checkUpdateUserInput, AuthMiddleware.isAuthed], async(req, res) => {
        try {  
            const { name, mail, role, password, services } = req.body;

            let user;
            let pwHash;

            if(password && password.length > 7){
                bcrypt.genSalt(12, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        pwHash = hash;
                    });
                });
            }

            let check_user = await User.findOne({ mail });

            if(!check_user){
                User.findOne({ _id: req.params.id })
                .select('+password')
                .exec((err, data) => {
                    if(err) throw err;
                    user = data;

                    user = {
                        name: name ? name : user.name,
                        mail: mail ? mail : user.mail,
                        role: role ? role : user.role,
                        password: password ? pwHash : user.password,
                        services: services ? services : user.services
                    }

                    User.findOneAndUpdate({ _id: req.params.id}, user, { useFindAndModify: false }).then((user) => {
                        return res.status(200).send({ message: 'Succesfully updated user' });
                    }).catch((err) => {
                        return res.status(403).send({ error: 'An error occured, please contact your administrator' });
                    });
                });
            }else{
                return res.status(403).send({ error: 'A user with this mail already exist.' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: 'An error occured, please contact your administrator' });
        }
    });
 

router.post('/user', /* InputMiddleware.checkAddUserInput,*/ AuthMiddleware.isAuthed,async(req, res) => {
        try{
            const { name, mail, role, password, services } = req.body;
            let user = await User.findOne({ mail });

            if(user){
                return res.status(409).send({ error: "A user with that mail already exist."});
            }else{
                user = new User({
                    name,
                    mail,
                    password,
                    role,
                    services
                });
            };

            if(!password){
                return res.status(409).send({ error: 'Please provide a password!'});
            }else{
                const salt = await bcrypt.genSalt(12);
                user.password = await bcrypt.hash(password, salt);
                
                await user.save();
                return res.status(200).send({ message: "User was successfully added."});
            }
        } catch (error){
            console.error(error);
            return res.status(409).send({ error: "Something went wrong while adding a new user."});
        }   
});

router.delete('/user/:id', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        User.findByIdAndDelete(req.params.id).exec((err, data) => {
            if(err) throw err;

            res.status(200).json({ message: `User ${data.name} deleted.`});
        });
    } catch (error) {
        res.status(400).json({ message: error});
    }
});

module.exports = router;