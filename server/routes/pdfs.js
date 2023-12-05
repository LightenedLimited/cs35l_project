var express = require('express');
var router = express.Router();

const pdfs = require("../schema/pdfs"); 
const { User } = require('../schema/user'); 

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

router.post('/search/', upload.none(), function(req, res, next) {
    console.log(req.body.filter.filter_body); 
    pdfs.Test.find(req.body.filter.filter_body).then((results) => {
        console.log(results); 
        res.json(results); 
    }).catch(err => {
        res.status(404)
    })
})
    

router.post('/upload', upload.single("pdf"), function(req, res, next) {
    console.log('lets try to upload some shi')
    const newPDF = new pdfs.Test({
        user_upload_id: req.session.userid, //validated by validLogin
        path: req.file.filename, 
        subject: req.body.subject, 
        professor: req.body.professor,
        title: req.body.title,
        upload_date: new Date(), 
        class: req.body.class, 
        quarter: req.body.quarter, 
        year: req.body.year,
        test_type: req.body.test_type, 
        has_solution: req.body.has_solution,
        users_notes: req.body.users_notes ? req.body.users_notes : "",
        download_count: 0,
    })
    User.findById(req.session.userid).then(uploader => { // user who submitted this test
    uploader.uploads++
    uploader.save()
    newPDF.save()
    }).then((success) => {
        res.sendStatus(200); 
    }).catch(err => {
        console.log(err)
        res.status(400).send(err) 
    })
}); 


router.post("/unique/:field", upload.none(), function(req, res, next) {
    console.log('trying to find unique', req.params.field)
    pdfs.Test.find(req.body.filter).distinct(req.params.field).then((results) => {
        res.status(200).json(results); 
    }).catch((err) => {
        res.status(500).send(err); 
    })
})

router.use("/files", express.static(path.join(__dirname, '../uploads'))); 

router.post('/increment', (req, res, next) => {
    test_id = req.body.test_id
    console.log('incrementing download count for document,', test_id)
    pdfs.Test.findById(test_id).then(test => {
        test.download_count++
        test.save()
    }).then(() => {
        res.status(200)
    }).catch(err => {
        res.status(500)
    })
})

module.exports = router; 