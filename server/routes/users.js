var express = require('express');
var router = express.Router();
var session; 

const { User } = require('../schema/user'); 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//session management here

router.post("/login", function(req, res, next) {
  // req.session.destroy(); //clear all session doing log-in attempt
  var candidateUsername = req.body.username; 
  var candidatePassword = req.body.password; 
  User.findOne({username: candidateUsername}).then((user) => {
    user.comparePasswords(candidatePassword, (eval) => {
      if(eval) {
        session = req.session; 
        session.userid = candidateUsername; 
        res.sendStatus(200); 
      }
      else {
        res.sendStatus(401); 
      }
    })
  }).catch(err => {
    res.send(err); 
  })
})


router.post("/logout", function(req, res, next) {
  req.session.destroy(); 
  res.status(200); 
})


module.exports = router;
