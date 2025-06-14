let routes=require("express");
let regCtrl=require("../controller/regCtrl");
let router=routes.Router();

//router.get("/",regCtrl.navpage);

router.get("/",regCtrl.homepage);
router.post("/register",regCtrl.regCtrl);
router.get("/signup",regCtrl.registerpage)

router.get("/signin",regCtrl.loginpage);
router.post("/validate",regCtrl.validateuser);

router.get("/addcat",regCtrl.addcategory);
router.post("/save",regCtrl.saveCategorydata);

router.get("/viewDish", regCtrl.viewCatpage);   


 router.get("/delcatbyid",regCtrl.delcategory);

router.get("/search",regCtrl.searchpage);

router.get("/catupdate",regCtrl.updatepage);

router.post("/catfinalupdate",regCtrl.updatepagetwo);
module.exports=router;