const validLogin = function() {
    return function(req, res, next) {
        if(req.session.userid) next(); 
        else {
           res.sendStatus(401); 
        }
    }
}

module.exports = {validLogin}; 