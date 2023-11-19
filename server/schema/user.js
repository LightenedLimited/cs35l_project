const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//basing off of https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        index: {
            unique: true
        }
    },
    password: {
        type: String, 
        required: true
    }
})

userSchema.methods.comparePasswords = function(otherPassword, cb) {
    cb(this.password == otherPassword); 
}

const User = mongoose.model("User", userSchema); 
module.exports = {User}; 