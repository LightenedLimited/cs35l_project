const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const testSchema = new Schema({
    user_upload_id: Schema.Types.ObjectId, 
    path: String, 
    subject: String,
    professor: String, 
    title: String,
    upload_date: Date, 
    class: String, 
    quarter: String, 
    year: Number,
    test_type: String
   }
)

const Test = mongoose.model("Test", testSchema); 
module.exports = {Test}; 