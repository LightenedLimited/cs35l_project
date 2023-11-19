const validLogin = function() {
    return function(req, res, next) {
        try {
            if(req.session.userid) next(req); 
            else {
                throw new Error("Not Logged In"); 
            }
        }
        catch(err) {
            res.status(401).json({"error": "Not Logged In"}); 
        }
    }
}

module.exports = {validLogin}; 