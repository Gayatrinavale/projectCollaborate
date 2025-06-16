let express=require("express");
let app=express();
let bodyparser=require("body-parser");
let router=require("../src/routes/regroutes.js")
let session = require('express-session');
const multer = require("multer");
const path = require("path");
app.use('/uploads', express.static('uploads'));//If you're storing images in an /uploads folder, expose it:

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

 

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}));


app.use("/",router);
app.set('view engine','ejs');
app.use(express.static("public"));
module.exports=app;