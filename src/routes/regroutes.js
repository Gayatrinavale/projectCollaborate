let routes=require("express");
let regCtrl=require("../controller/regCtrl");
let router=routes.Router();
let multer=require("multer");

const upload=multer({dest:"./public/upload"});
//router.get("/",regCtrl.navpage);

router.get("/",regCtrl.homepage);
router.post("/register",regCtrl.regCtrl);
router.get("/signup",regCtrl.registerpage)

router.get("/signin",regCtrl.loginpage);
router.post("/validate",regCtrl.validateuser);
//++++++++++++++++++++++++=================== Home page nav content++++++++++++++++++++++++++++++++++++++++++++
router.get("/menu",regCtrl.homemenu);


//++++++++++++++++++++++++++=====viewcategory admin dashboard and search delete update++++++++++++++++++++++++++
router.get("/addcat",regCtrl.addcategory);
router.post("/save",regCtrl.saveCategorydata);
router.get("/viewDish", regCtrl.viewCatpage);   


 router.get("/delcatbyid",regCtrl.delcategory);

router.get("/search",regCtrl.searchpage);

router.get("/catupdate",regCtrl.updatepage);

router.post("/catfinalupdate",regCtrl.updatepagetwo);

router.get("/admindashboard",regCtrl.admindash);


//=============Menu AAdmin Dashboard ====================================
router.get("/addmenu",regCtrl.AddAdminmenu);
router.post("/savemenu",upload.single("image"),regCtrl.SaveMenuPage)

router.get("/viewmenu",regCtrl.ViewAdminmenue);



module.exports=router;