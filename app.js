const express = require("express");
const session=require("express-session")


//require mongo:
const mongoose=require('mongoose')
const {ObjectId} = require('mongodb');


//require table:
const {Question,Response}=require('./model')


//require middeleware:
const {authenticateUser}= require('./middleware/login')
const {signUpMiddleware}=require('./middleware/registre')
const {addQuestionMiddleware} = require('./middleware/add_question')
const {addResponseMiddleware} =require('./middleware/add_reponse')


const app = express();
app.use(express.urlencoded({extended:true}))


//js engin:
app.set("view engine","pug")
app.set("views","./views")
app.use(express.static("./public"))

const myConnectionURI = 'mongodb://127.0.0.1:27017';

(async()=>{
    await mongoose.connect(myConnectionURI)
    console.log("Connect success");

})()

//session:
app.use(session({
    secret:"Un secret",
    resave: false,
    saveUninitialized: true,
}))

//routes:
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/registre',(req,res)=>{
    res.render('registre')
})

//logout:
app.get("/logout",(req,res)=>{
    req.session.user=false
    res.redirect("/")
});

//home page ==> obtain all question
app.get('/',async(req,res)=>{
    const questions = await Question.find().sort({ date: -1 });
    res.render("home",{session:req.session.user,questions:questions});
})

  
app.post('/login_auth', authenticateUser, (req, res) => {
    res.redirect('/');
});
  

app.post('/create_compte', signUpMiddleware, (req, res) => {
    res.render("login");
});


app.post('/add_question', addQuestionMiddleware, (req, res) => {
    res.redirect('/');
});


app.post("/add_reponse/:id_question", addResponseMiddleware, (req, res) => {
    res.redirect(`/${req.params.id_question}`);
});
 

//page question:
app.get("/:id_question", async (req, res) => {
    if (req.params.id_question === 'favicon.ico') {
        return;
    }
    const objectId_id_question = new ObjectId(req.params.id_question);
    const message = await Question.findOne({ _id: objectId_id_question }).select('question');
    const reponses = await Response.find({ question_id: objectId_id_question }).sort({ date: -1 });
    res.render("question", { reponses: reponses, message: message });
});








app.listen(3000)