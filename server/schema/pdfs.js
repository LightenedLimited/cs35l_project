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
    quarter: {
        type: String,
        enum: ["Fall", "Winter", "Spring", "Summer"]
    }, 
    year: Number,
    test_type: {
        type: String,
        enum: ["Quiz", "Midterm", "Final", "Practice Quiz", "Practice Midterm", "Practice Final"]
    },
    has_solution: Boolean, 
    users_notes: String
   }
)

const Test = mongoose.model("Test", testSchema); 
module.exports = {Test}; 