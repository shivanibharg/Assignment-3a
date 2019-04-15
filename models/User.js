const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
        },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: false
    },
    date:{
         type: Date,
         default: Date.now
    },
   
 });

module.exports = User = mongoose.model('users', UserSchema);