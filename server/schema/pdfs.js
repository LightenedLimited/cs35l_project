const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const testSchema = new Schema({
    user_upload_id:  {
        type: Schema.Types.ObjectId, 
        required: true
    }, 
    path: {
        type: String,
        required: true
    }, 
    subject: {
        type: String,
        required: true
    },
    professor: {
        type: String, 
        required: true
    }, 
    title: {
        type: String, 
        required: true
    },
    upload_date: {
        type: Date,
        required: true
    }, 
    class: {
        type: String,
        required: true
    }, 
    quarter: {
        type: String,
        enum: ["Fall", "Winter", "Spring", "Summer"],
        required: true
    }, 
    year: {
        type: Number,
        required: true
    },
    test_type: {
        type: String,
        enum: ["Quiz", "Midterm", "Final", "Practice Quiz", "Practice Midterm", "Practice Final"],
        required: true
    },
    has_solution: {
        type: Boolean,
        required: true
    }, 
    users_notes: String,
    // from leroy
    download_count: {
        type: Number,
        required: true,
   }
}
)

const Test = mongoose.model("Test", testSchema); 
module.exports = {Test}; 