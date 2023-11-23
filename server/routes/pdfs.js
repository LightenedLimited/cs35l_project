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
    const newPDF = new pdfs.Test({
        user_upload_id: req.session.userid, //validated by validLogin
        path: req.file.path, 
        subject: req.body.subject, 
        professor: req.body.professor,
        title: req.body.title,
        upload_date: new Date(), 
        class: req.body.class, 
        quarter: req.body.quarter, 
        year: req.body.year,
        test_type: req.body.test_type, 
        has_solution: req.body.has_solution,
        users_notes: req.body.users_notes ? req.body.users_notes : ""
    })
    newPDF.save().then((success) => {
        res.sendStatus(200); 
    }).catch(err => {
        res.status(400).send(err) 
    })
}); 


module.exports = router; 