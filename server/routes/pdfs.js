var express = require('express');
var router = express.Router();

const pdfs = require("../schema/pdfs"); 
const { validLogin } = require("../middleware/cookieManager"); 
var path = require('path'); 
var multer = require('multer'); 

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads/'));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + ".pdf"); 
        }
    })
})

router.use(validLogin()); 

router.get('/search', function(req, res, next) {
    const search_filters = req.body; 
    pdfs.Test.find(search_filters).then((results) => {
        res.json(results); 
    })
})

router.post('/upload', upload.single("pdf"), function(req, res, next) {
    res.sendStatus(200); 
}); 


module.exports = router; 