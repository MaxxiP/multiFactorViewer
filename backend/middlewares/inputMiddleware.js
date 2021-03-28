const {check, validationResult } = require("express-validator");


exports.checkUpdateUserInput = (req, res, next) => {
    check('id', 'ID seems to be faulty').not().isEmpty(),
    check('name', "Bitte tragen Sie einen gültigen Benutzernamen ein.")
    .not()
    .isEmpty(),
    check('mail', "Bitte tragen Sie eine gültige Email Adresse ein.")
    .isEmail(),
    check('role', "Bitte wählen Sie eine gültige Benutzer Rolle."),
    check('password', "Bitte tragen Sie ein gültiges Password ein.")
    .isLength({ 
        min: 8,
        max: 40
    }) 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        next(); 
    }
};


exports.checkLoginInput = ( req, res, next ) => {
    check('mail', 'Please enter a valid email.')
        .not()
        .isEmpty()
        .isEmail()
        .isLength({ max: 40, min: 8 }),
    check('password', 'Please check the provided password.')
        .not()
        .isEmpty()
        .isLength({ max: 40, min: 8 })  

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.errors[0].msg
        });
    }else{
        next();
    }
}


exports.checkAddUserInput = ( req, res, next ) => {
    check('name', 'Please insert a username')
        .not()
        .isEmpty()
        .isLength({ max: 25, min: 2 }),
    check('mail', 'Please enter a valid email.') 
        .not()
        .isEmpty()
        .isEmail()
        .isLength({ max: 40, min: 8 }),
    check('password', 'Please check the provided password.')
        .not()
        .isEmpty()
        .isLength({ max: 40, min: 8 }),
    check('role', 'Please select a user role')
        .not()
        .isEmpty()
        .isLength({ max: 15 })

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.errors[0].msg
        });
    }else{
        next(); 
    }
}

exports.checkAddServiceInput = (req, res, next) => {
    check('name', 'Please enter a service name.')
    .not().isEmpty().isLength({ min: 2, max: 25 }),
    check('username', 'Please enter a username.')
    .not().isEmpty().isLength({ min: 2, max: 25 }),
    check('mail', "Please enter a valid email.")
    .not().isEmpty().isEmail().isLength({ min: 8, max: 40 }),
    check('secret', 'Please provide a secret "String".')
    .not().isEmpty().isLength({ max: 5, min: 100 })

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        next();
    }
}