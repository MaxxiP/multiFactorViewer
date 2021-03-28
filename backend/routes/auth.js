const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const InputMiddleware = require('../middlewares/inputMiddleware');

const User = require("../model/User");
const Service = require("../model/Service");

router.get('/isLoggedIn', async (req, res) => {
    if(req.session.user){
        let services = [];

        req.session.user.services.map(service => { 
            services.push(service.id.toString());
        });

        let userData = {
            name: req.session.user.name,
            mail: req.session.user.mail,
            role: req.session.user.role, 
            services: services
        }
        return res.status(200).send({ message: 'Welcome back!', userData});
    }else{
        return res.status(200).send({ message: 'No one is logged in, no session running'});
    }
})

router.post('/login', InputMiddleware.checkLoginInput, async(req, res) => {
    const { mail, password } = req.body;

    try {
        let user = await User.findOne({ 
                mail
            }).select('+password').lean();
        if(!user){
            return res.status(400).json({
                message: "Please check email and password and try again."
            });
        }

        if(!password){
            res.status(409).send({ message: 'No password was provided!'});
        }else{
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){ 
                return res.status(400).json({
                    message: "Please check email and password and try again."
                });
            }else{

                delete user.password;
    
                Service.find()
                    .where('_id')
                    .in(user.services)
                    .select('+secret')
                    .exec((err,data) => {
                        if(err) throw err;
    
                        let serviceInfoWithSecret = [];
                        data.map((info => {
                            serviceInfoWithSecret.push({ 
                                id: info._id,
                                secret: info.secret
                            });
                        }));
    
                        user.services = serviceInfoWithSecret;
                        req.session.user = user;
                        return res.status(200).json({ message: 'successfully logged in', id: user._id });
                    });            
            }
        }

    } catch (error) {
        console.error(error);
        res.status(409).send({ message: 'Something went wrong on login but it is`s not your fault, please contact an administrator.'});
    }
});

router.post('/logout', AuthMiddleware.isAuthed, async (req, res) => {
    if(req.session.user){
        req.session.destroy(err => {
            if(err){
                console.log(err);
                return res.status(403).send({ message: 'An error occured on logout', error: err });
            }else{
                res.clearCookie('sid');
                return res.status(200).send({ message: 'Logged out!'});
            }
        });
    }else{
        res.status(500).send('Cannot be logged out, since user is not logged in in the first place.');
    }
});

module.exports = router;