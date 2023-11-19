var express = require('express');
var router = express.Router();

const pdfs = require("../schema/pdfs"); 
const { validLogin } = require("../middleware/cookieManager"); 

router.use(validLogin()); 

router.get('/search', function(req, res, next) {
    const search_filters = req.body; 
    pdfs.Test.find(search_filters).then((results) => {
        res.json(results); 
    })
})

module.exports = router; 