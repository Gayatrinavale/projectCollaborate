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
router.post("/save",regCtrl.AddCat);



module.exports=router;