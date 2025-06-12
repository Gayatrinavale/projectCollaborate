let RegService=require("../service/regservice");
let regmodel=require("../models/regmodel.js");
// exports.navpage=(req,res)=>{
//     res.render("nav.ejs");
// }
exports.regCtrl=(req,res)=>{
    let{name, email, contact,oldusername, newusername, password}=req.body;
    let result=RegService.acceptRegData(name, email, contact, oldusername,newusername, password);
     res.render("register",{msg:result});
}
exports.registerpage=(req,res)=>{
    res.render("register.ejs",{msg:""});
}
exports.loginpage=(req,res)=>{
    res.render("login.ejs",{msg:""});
}
exports.validateuser=(req,res)=>{
    let{username,password}=req.body;
    let result=regmodel.validateuserfromDB(username,password);
    result.then((r)=>{
        if(r.length >0){
        req.session.uid=r[0].id;
        console.log("login id stored in session"+r[0].id);
        res.render("dashboard.ejs");
        }
        else{
            res.render("login.ejs",{msg:"Invalid credentials"});
        }

    });
}

//home page
exports.homepage=(req,res)=>{
    res.render("homepage.ejs");
}