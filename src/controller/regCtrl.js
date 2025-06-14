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

/*
exports.addcategory=(req,res)=>{
    res.render("AddCategory.ejs",{msg:""});
}
exports.saveCategorydata = (req, res) => {
    let {name } = req.body;
        
    regmodel.saveCategorydata(name, (err, result) => {
        if (err) {
           
            res.render("AddCategory", { msg: "Error saving category" });
        } else {
            res.render("AddCategory", { msg: "Category added successfully" });
        }
    });
};

exports.viewCatpage=(req,res)=>{
    let result=regmodel.viewCatpage();
    result.then((r)=>{
        if(r>0){
            console.log(r);
            res.render("viewcategory.ejs",{data:r});
        }
        else{
            res.render("viewcategory.ejs",{data:[]});
        }
    }).catch((err)=>{
        console.log("error");
    })

};

// exports.viewCatpage = (req, res) => {
//     regmodel.viewCatpagefromDB((err, result) => {
//         if (err) {
//             console.log("Error fetching category:", err);
//             res.render("AddCategory");
//         } else {
//             res.render("viewcategory", { msg: result }); // Pass result to EJS
//         }
//     });
// };

*/



exports.viewCatpage = (req, res) => {
    regmodel.viewCatpage()
        .then((r) => {
            console.log("Data from DB:", r);
            res.render("viewcategory.ejs", { data: r });
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            res.render("viewcategory.ejs", { data: [] });
        });
};

exports.addcategory = (req, res) => {
    res.render("AddCategory.ejs", { msg: "" });
};

exports.saveCategorydata = (req, res) => {
    let { name } = req.body;

    regmodel.saveCategorydata(name, (err, result) => {
        if (err) {
            res.render("AddCategory", { msg: "Error saving category" });
        } else {
            res.render("AddCategory", { msg: "Category added successfully" });
        }
    });
};


exports.delcategory = (req, res) => {
    let cid = parseInt(req.query.id?.trim());

    regmodel.delcatfromDB(cid, (err, result) => {
        if (err) {
            res.render("viewcategory.ejs", { data: [] }); // or show error message
        } else {
            res.render("viewcategory.ejs", { data: result });
        }
    });
};

exports.searchpage = (req, res) => {
    let name = req.query.sd;

    regmodel.searchpagefromDB(name, (err, result) => {
        if (err) {
            res.render("viewcategory.ejs", { data: [] }); // Handle error gracefully
        } else {
            res.render("viewcategory.ejs", { data: result });
        }
    });
};

// exports.searchpage = (req, res) => {
//     let name = req.query.sd;
//     regmodel.searchpagefromDB(name, (err, result) => {
//         if (err) {
//             res.json([]);  // important: respond with JSON, not a view
//         } else {
//             res.json(result);
//         }
//     });
// };


// Show the update form
exports.updatepage = (req, res) => {
    let id = parseInt(req.query.cid.trim());  // cid from URL, maps to id in DB
    regmodel.updatepagefromDB(id, (err, result) => {
        res.render("updatecat.ejs", { crecord: result });
    });
};

// Handle update form POST submission
exports.updatepagetwo = (req, res) => {
    let { id, name } = req.body;  // id and name from form

    regmodel.updatepagefinalfromDB(id, name, (err, result) => {
        if (err) {
            res.render("viewcategory.ejs", { data: [] });
        } else {
            res.render("viewcategory.ejs", { data: result });
        }
    });
};
