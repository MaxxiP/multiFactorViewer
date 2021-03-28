// Validation Middleware
exports.isAuthed = (req, res, next) => {
    try{
        if(!req.session.user._id){
            return res.status(401).send({ message: 'Not authenticated'});
        }else{
            return next();
        }
    }catch{
        return res.status(500).send({ message: 'Not authenticated'});
    }
};
