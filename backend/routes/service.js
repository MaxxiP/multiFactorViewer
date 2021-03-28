const express = require("express");
const speakeasy = require('speakeasy');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const InputMiddleware = require('../middlewares/inputMiddleware');

const Service = require("../model/Service");

router.get('/services', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        Service.find().exec((err, data) => {
            if(err) throw err;

            res.status(200).json(data);
        });
    } catch (err) {
        console.error(err);
    }
});

router.get('/service', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        let services;
        if (req.query[0]) {
            services = Object.values(req.query);
        } else {
            services = req.session.user.services;
        }

        let newList = [];
        services.forEach(element => {
            newList.push(element.id);
        });


        Service.find()
            .where('_id')
            .in(newList)
            .exec((err, data) => {

            if(err) throw err;

            let userServiceInfo = []; 
            data.map((info => {
                userServiceInfo.push({ 
                    name: info.name,
                    mail: info.mail,
                    username: info.username,
                    id: info._id
                });
            }));

            res.status(200).json(userServiceInfo);
        });
        
    } catch (err) {
        console.error(err);
    }
});

router.get('/servicesAssigned', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        let services= Object.values(req.query);

        Service.find()
            .where('_id')
            .in(services)
            .exec((err, data) => {

            if(err) throw err;

            let userServiceInfo = []; 
            data.map((info => {
                userServiceInfo.push({ 
                    name: info.name,
                    mail: info.mail,
                    username: info.username,
                    id: info._id
                });
            }));

            res.status(200).json(userServiceInfo);
        });
        
    } catch (err) {
        console.error(err);
    }
});

router.get('/service/:id', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        let serviceId = req.params.id;

        Service.findOne({ _id: serviceId })
        .exec((err, data) => {
        if(err) throw err;

        res.status(200).json(data);
    });

    } catch (err) {
        console.error(err);
    }
});

router.get('/code/generate', AuthMiddleware.isAuthed, async(req, res) => {
    if(req.session.user){

        try {
            let code_list = [];

            let service_ids = [];
            req.session.user.services.map((service) => {
                service_ids.push(service.id);
            });

            Service.find()
                .select('+secret') 
                .where('_id')
                .in(service_ids)
                .exec((err, data) => {    
                    if(err) throw err;
                // erzeuge code aus secret und sende nur wichtige informationen als res
                data.map((service => {
                    let token = speakeasy.totp({
                        secret: service.secret,
                        digits: 6, 
                        step: 30,
                        encoding: 'base32'
                    })

                    code_list.push(token.substring(0,3) + ' ' + token.substring(3, token.length));
                }));
                return res.status(200).send({ codeList: code_list });
            }); 
        } catch (err) {
            return res.status(500).send({ error: 'Please contact an administrator.'});
        }
    }else{
        res.status(409).send({ code: 'Not authenticated' });
    }
});

router.patch('/service/:id', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        const { name, mail, username, secret, encoding, digits } = req.body;
 
        let service;
        let check_service = await Service.findOne({ secret });

        if(!check_service){
            Service.findOne({ _id: req.params.id})
            .select('+secret')
            .exec((err, data) => {
                if(err) throw err;
                service = data;
    
                service = {
                    name: name ? name : service.name,
                    mail: mail ? mail : service.mail,
                    username: username ? username : service.username,
                    secret: secret ? secret : service.secret,
                    options: {
                        base_encoding: encoding ? encoding : service.encoding,
                        digits: digits ? digits : service.digits
                    }                
                }
        
                Service.findOneAndUpdate({ _id: req.params.id }, service, { useFindAndModify: false })
                .then((service) => {
                    return res.status(200).send({ message: 'Service updated.'});
                }).catch((err) => {
                    console.log(err);
                    return res.status(500).send({ message: 'There was an error on updateing the user.', error: err})
                });
            });
        }else{
            res.status(422).send({ error: 'A service with this secret already exists'});
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ errors: err });
    }

});

router.post('/service', [InputMiddleware.checkAddServiceInput, AuthMiddleware.isAuthed], async(req, res) => {
    try{
    
        const {
            name,
            mail,
            username,
            secret,
            usedBy
        } = req.body;
    
        const options = { 
            base_encoding: req.body.base_encoding,
            digits: req.body.digits
        };

        let service = await Service.findOne({ secret });

        if(service){
            res.status(409).send({ error: 'A service with this secret already exists'});
        }else{
            
            service = new Service({
                name,
                mail,
                username,
                secret,
                options,
                usedBy
            });

            await service.save().then(res.status(200).send({ message : 'Successfully added Service'}));    
        };
    } catch (error){
        console.error(error);
        res.status(500).send({ message: 'An error occured serversided '});
    }
});

router.delete('/service/:id', AuthMiddleware.isAuthed, async(req, res) => {
    try {
        Service.findByIdAndDelete(req.params.id).exec((err, data) => {
            if(err) throw err;

            res.status(200).json(data);
        });
    } catch (error) {
        res.status(400).json({ message: error});
    }
});



module.exports = router;