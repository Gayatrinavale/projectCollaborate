let express=require("express");
let app=express();
let bodyparser=require("body-parser");
let router=require("../src/routes/regroutes.js")
let session = require('express-session');
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