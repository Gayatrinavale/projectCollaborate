let RegService=require("../service/regservice");
let regmodel=require("../models/regmodel.js");
const staffCtrl = require('./staffCtrl');
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
//+++++++++++++++++++++++++++++++++++++++++++++HOMEPAGE Content++++++++++++++++

 exports.homemenu = (req, res) => {
  regmodel.getAllMenuItemsfromDB((err, menuItems) => {
    if (err) {
      return res.send("Error fetching menu");
    }
    res.render("HomeMenu", { menuItems });
  });
};
//++++++++++++++++++++++++++++++++++++++++=  home page +++++++++++
exports.aboutpage=(req,res)=>{
    res.render("about.ejs",{msg:""});
}

exports.chefpage=(req,res)=>{
    res.render("chef.ejs",{msg:""});
}

exports.gallerypage=(req,res)=>{
    res.render("gallery.ejs",{msg:""});
}

exports.contactpage=(req,res)=>{
    res.render("contact.ejs",{msg:""});
}


exports.logoutpage=(req,res)=>{
    res.render("homepage.ejs");
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
//admin  dashboard
exports.admindash=(req,res)=>{
     res.render("dashboard.ejs");
}
//++++++++++++++++++++++++++++=============== Menue ++++++++++++++++++++++++++++++++++++++++
exports.AddAdminmenu = (req, res) => {
  regmodel.getAllCategoryFormenu((err, categories) => {
    if (err) {
      return res.send("Error fetching categories");
    }

    res.render("AddAdminMenu", { categories, msg: "" });
  });
};
exports.SaveMenuPage = (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  regmodel.savemenufromDB(name, category, price, description, image, (err, result) => {
    if (err) {
      console.log("Error saving menu:", err); // 👈 Check terminal for real DB error
      regmodel.getAllCategoryFormenu((e, categories) => {
        res.render("AddAdminMenu", { msg: "Error saving menu", categories });
      });
    } else {
      regmodel.getAllCategoryFormenu((e, categories) => {
        res.render("AddAdminMenu", { msg: "Menu added successfully", categories });
      });
    }
  });
};


exports.ViewAdminmenue = (req, res) => {
    regmodel.ViewAllAdminMenus((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render("ViewAdminMenu", { menus: result }); // <- Check this line
        }
    });
};
//++++++++++++++++++++++++++++++++++++++++++++= staff ++++++++++++++++++++++++++++++
exports.AddAdminStaff=(req,res)=>{
    res.render("AddAdminStaff.ejs",{msg:""});
}
exports.saveAdminStaff=(req,res)=>{
    let {name,email,contact,salary}=req.body;
    regmodel.AddAdminStafffromDB(name,email,contact,salary,(err,result)=>{
          if (err) {
            res.render("AddAdminStaff", { msg: "Error saving Staff" });
        } else {
            res.render("AddAdminStaff", { msg: "Satff added successfully" });
        }
      
    });
};
exports.viewAdminStaff = (req, res) => {
    regmodel.ViewAdminStafffromDB((err, result) => {
        if (err) {
            console.log(err);
            res.render("ViewStaff", { staffList: [], msg: "Error fetching staff data" });
        } else {
            res.render("ViewStaff", { staffList: result, msg: "" });
        }
    });
};

//+++++++++++++++++++++++++++++++++++++++ Table ++++++++++++++++++++++++++++++++++
exports.getAddDiningTableForm = (req, res) => {
    res.render("AddDiningTable", { msg: "" });
};

exports.saveDiningTable = (req, res) => {
    const {table_number, capacity, availability_status } = req.body;

    regmodel.insertDiningTable(table_number,capacity, availability_status, (err, result) => {
        if (err) {
            console.log(err);
            res.render("AddDiningTable", { msg: "Error adding table" });
        } else {
            res.render("AddDiningTable", { msg: "Table added successfully" });
        }
    });
};

exports.viewAdminTable=(req,res)=>{
    regmodel.viewAdminTablefromDB((err,result)=>{

    if (err) {
      console.log(err);
      res.render("ViewTable.ejs", { tables: [], msg: "Error loading data" });
    } else {
      res.render("ViewTable.ejs", { tables: result, msg: "" });
    }
  });
};
// exports.deleteDiningTable = (req, res) => {
//     const id = req.params.id;
//     regmodel.deleteDiningTableById(id, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         res.redirect("/viewtables");
//     });
// };
// exports.getUpdateDiningTableForm = (req, res) => {
//     const id = req.params.id;
//     regmodel.getDiningTableById(id, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.redirect("/viewtables");
//         } else {
//             res.render("UpdateDiningTable", { table: result[0] });
//         }
//     });
// };
// exports.updateDiningTable = (req, res) => {
//     const id = req.params.id;
//     const { table_number, capacity, availability_status } = req.body;
//     regmodel.updateDiningTable(id, table_number, capacity, availability_status, (err) => {
//         if (err) {
//             console.log(err);
//         }
//         res.redirect("/viewtables");
//     });
// <<<<<<< HEAD
// };
// =======
// };


//++++++++++++++++++++++++++++++++++++++++ STAFF +++++++++++++++++++++++++++++++++=

// >>>>>>> 05e6ea034765b82c8299f038bad6556d2b0f0a25
