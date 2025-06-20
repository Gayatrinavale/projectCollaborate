let express=require("express");
let app=express();
let bodyparser=require("body-parser");
let router=require("../src/routes/regroutes.js")
const staffRoutes = require('./routes/staffroutes');

let session = require('express-session');
const multer = require("multer");
const path = require("path");
app.use('/uploads', express.static('uploads'));//If you're storing images in an /uploads folder, expose it:

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "../views"))
app.use(express.static("public"));
 

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}));




app.use("/",router);
app.use('/staff', staffRoutes);

module.exports=app;