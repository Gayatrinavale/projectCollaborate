let conn=require("../config/db.js")

exports.saveUser=(...regData)=>{

    conn.query("insert into users values('0',?,?,?,?,?)",[...regData]);
    return true;
    // console.log("data stored");
}
// conn.query(
//   "INSERT INTO users (id, name, email, contact, username, password) VALUES (?, ?, ?, ?, ?, ?)",
//   [0, name, email, contact, newusername, password]
// ); we can do this but sql knowns the order ...so it stored exact that 4th username


exports.validateuserfromDB=(...usercred)=>{
    let promise=new Promise((resolve,reject)=>{

        conn.query("select * from users where username=? and password=?",[...usercred],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    });
    return promise;
};
exports.getloginUserProfile=(loginuserId)=>{
    let promise=new Promise((resolve,reject)=>{

        conn.query("select * from users where id=?",[liginuserId],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    });
    return promise;
};

exports.addcastegoryfromDB = (name, callback) => {
    conn.query("INSERT INTO category VALUES (0, ?)", [name], callback);
};

    
