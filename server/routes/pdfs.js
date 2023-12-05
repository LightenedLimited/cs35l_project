var express = require('express');
var router = express.Router();

const pdfs = require("../schema/pdfs"); 
const { validLogin } = require("../middleware/cookieManager"); 
var path = require('path'); 
var multer = require('multer'); 

const { fromPath } = require('pdf2pic'); 
const { createWorker, createScheduler } = require('tesseract.js'); 
const scheduler = createScheduler();


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
        users_notes: req.body.users_notes ? req.body.users_notes : ""
    })
    fromPath(path.join(__dirname, "../uploads", req.file.filename), 
    {
        density: 100,
        saveFilename: req.file.filename,
        savePath: path.join(__dirname, "../images"),
        format: "png",
        width: 600,
        height: 600
    }).bulk(-1).then(async (resolve) => {
        const tesseractWorker = await createWorker('eng', 1, {
            logger: m => console.log(m), // Add logger here
        }); 
        scheduler.addWorker(tesseractWorker); 
        return Promise.all(resolve.map((image) => (scheduler.addJob('recognize', image['path']))));
    }).then((ret) => {
        //remap ret to text
        return ret.map((example) => example.data.text); 
    }).then(console.log); 
    
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

module.exports = router; 