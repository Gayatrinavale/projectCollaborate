let app=require("./src/app.js");
require('dotenv').config();  // Call as early as possible

const PORT=process.env.PORT; 


app.listen(PORT,()=>{
    console.log("server started");
});