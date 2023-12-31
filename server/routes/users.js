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
        session.userid = user._id; 
        res.sendStatus(200); 
      }
      else {
        res.sendStatus(401); 
      }
    })
  }).catch(err => {
    res.status(500).send(err); 
  })
})


router.post("/logout", function(req, res, next) {
  	req.session.destroy(); 
  	res.status(200); 
})

router.post("/create", function(req, res, next) {
	var candidateUsername = req.body.username; 
    var candidatePassword = req.body.password;
	User.exists({username: candidateUsername}).then((exists) => {
		if(exists) return res.status(400).send("Username exists"); 
		const newUser = new User({username: candidateUsername, password: candidatePassword, uploads: 0}); 
		newUser.save().then((success) => {
			res.sendStatus(201); 
		}).catch(err => {
			res.status(500).send(err); 
		}) 
	}).catch(err => {
		res.status(500).send(err); 
	})
})


router.get('/validate/:id', (req, res, next) => {
  let candidateEmail = req.params.id
  console.log('email:', candidateEmail)
  User.exists({username: candidateEmail}).then((exists) => {
    if (exists){
      return res.status(200).send({emailInUse: true})
    }
    return res.status(200).send({emailInUse: false})
  }).catch(err => {
    res.status(500).send(err)
  })
})

router.post("/listUsers", function (req, res, next) {
    User.find().then((results) => {
        res.status(200).json(results);
    }).catch(err => {
        res.status(500).send(err)
    })
})

module.exports = router;
