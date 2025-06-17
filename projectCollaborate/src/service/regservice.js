let regmodel=require("../models/regmodel.js");
class RegService{
   acceptRegData(name, email, contact, oldusername, newusername, password){
    // console.log("data recived");
    // console.log("name:",name);
    // console.log("email:",email);
    // console.log("conatct:",contact);
    // console.log("old username:",oldusername);
    // console.log(" new username:",newusername);
    // console.log("password:",password);
    // return "Data received and printed on console.";

   //  console.log("Data received");

    if (oldusername === newusername) {
        //console.log(" Old and new usernames are the same. Registration not allowed.");
        return "Old and new usernames must be different.";
    }

    // Proceed with registration logic
    else{
      regmodel.saveUser(name,email,contact,newusername,password)
       return "Registration successful!";
    }
   
   }

}

module.exports=new RegService();