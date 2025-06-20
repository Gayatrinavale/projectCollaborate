let routes=require("express");
let regCtrl=require("../controller/regCtrl");
let router=routes.Router();
const staffRoutes = require('./staffroutes');
let multer=require("multer");

const upload=multer({dest:"./public/upload"});
//router.get("/",regCtrl.navpage);

router.get("/",regCtrl.homepage);
router.post("/register",regCtrl.regCtrl);
router.get("/signup",regCtrl.registerpage)

router.get("/signin",regCtrl.loginpage);
router.post("/validate",regCtrl.validateuser);

router.get("/admindashboard",regCtrl.admindash);
//++++++++++++++++++++++++=================== Home page nav content++++++++++++++++++++++++++++++++++++++++++++
router.get("/menu",regCtrl.homemenu);

//++++++++++++++++++++++++++=====viewcategory admin dashboard and search delete update++++++++++++++++++++++++++
router.get("/addcat",regCtrl.addcategory);
router.post("/save",regCtrl.saveCategorydata);
router.get("/viewDish", regCtrl.viewCatpage);   


 router.get("/delcatbyid",regCtrl.delcategory);

router.get("/search",regCtrl.searchpage);

router.get("/catupdate",regCtrl.updatepage);



router.get("/about",regCtrl.aboutpage);

router.get("/chef",regCtrl.chefpage);

router.get("/gallery",regCtrl.gallerypage);

router.get("/contact",regCtrl.contactpage);


router.get("/logout",regCtrl.logoutpage);



router.get("/logout",regCtrl.logoutpage);
// >>>>>>> aa49704 (i have added new ejs file also change in src)
// >>>>>>> 05e6ea034765b82c8299f038bad6556d2b0f0a25

//=============Menu AAdmin Dashboard ====================================
router.get("/addmenu",regCtrl.AddAdminmenu);
router.post("/savemenu",upload.single("image"),regCtrl.SaveMenuPage)

router.get("/viewmenu",regCtrl.ViewAdminmenue);

//+++++++++++++++++++++++++++++=====  staff ++++++++++++++++
router.get("/addstaff",regCtrl.AddAdminStaff);
router.post("/savestaff",regCtrl.saveAdminStaff);
router.get("/viewstaff", regCtrl.viewAdminStaff);
// <<<<<<< HEAD
// =======

//+++++++++++++++++++++++++++++++++++++++++Table +++++++++++++++++++++++++++++
router.get("/addtable", regCtrl.getAddDiningTableForm);
router.post("/addtable", regCtrl.saveDiningTable);
router.get("/viewtable", regCtrl.viewAdminTable);
//  router.get("/deletetable/:id", controller.deleteDiningTable);
// router.get("/updatetable/:id", controller.getUpdateDiningTableForm);
// router.post("/updatetable/:id", controller.updateDiningTable);



//+++++++++++++++++++++++++++++++++++++++ Staff dashboard or routes ++++++++++++++++++++++++++++++++++++++++++

router.use('/staff', staffRoutes);

// >>>>>>> 05e6ea034765b82c8299f038bad6556d2b0f0a25

//+++++++++++++++++++++++++++++++++++++++++Table +++++++++++++++++++++++++++++
router.get("/addtable", regCtrl.getAddDiningTableForm);
router.post("/addtable", regCtrl.saveDiningTable);
router.get("/viewtable", regCtrl.viewAdminTable);
//  router.get("/deletetable/:id", controller.deleteDiningTable);
// router.get("/updatetable/:id", controller.getUpdateDiningTableForm);
// router.post("/updatetable/:id", controller.updateDiningTable);

module.exports=router;