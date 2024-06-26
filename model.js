const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


//table user:
const userSchema = new Schema({
    name: String,
    password: String
});
const User = model('User', userSchema);



//table question:

const questionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for user_id
        ref: 'User' // Reference the 'User' collection
    },
    question: String,
    date: Date
});
const Question = model('question', questionSchema);

//table reponse:

const reponseSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'question' 
    },
    response: String,
    date: Date
});
const Response = model('Reponse', reponseSchema);




//exports
module.exports = {User,Question,Response};