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

/*
// regmodel.js
exports.saveCategorydata = (name, callback) => {
    conn.query("INSERT INTO category (name) VALUES (?)", [name], callback);
};

exports.viewCatpage=()=>{
    return promise=new Promise((resolve,reject)=>{
        conn.query("select * from category",(err,result)=>{
            if(err){
                reject(err);

            }
            else{
                console.log(result);
                resolve(result);
            }
        });
    });
}

// exports.viewCatpagefromDB = (callback) => {
//     conn.query("SELECT * FROM category", callback); // No parameters needed
// };

*/
//===============================Homepage navbar content ===================

exports.getAllMenuItemsfromDB = (callback) => {
  conn.query("SELECT * FROM menu", callback);
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.viewCatpage = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM category", (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.saveCategorydata = (name, callback) => {
    conn.query("INSERT INTO category (name) VALUES (?)", [name], callback);
};

exports.delcatfromDB = (cid, callback) => {
    // First delete the record
    conn.query("DELETE FROM category WHERE id = ?", [cid], (err, result) => {
        if (err) {
            callback(err);
        } else {
            // Then fetch the updated list
            conn.query("SELECT * FROM category", callback);
        }
    });
};

exports.searchpagefromDB = (name, callback) => {
    conn.query("SELECT * FROM category WHERE name LIKE '%" + name + "%'", callback);
};

// Get record by ID
exports.updatepagefromDB = (id, callback) => {
    conn.query("SELECT * FROM category WHERE id = ?", [id], callback);
};

// Update record and fetch updated list
exports.updatepagefinalfromDB = (id, name, callback) => {
    conn.query("UPDATE category SET name = ? WHERE id = ?", [name, id], (err) => {
        if (err) {
            callback(err);
        } else {
            conn.query("SELECT * FROM category", callback);
        }
    });
};


//+++++++++++++++++++++++++Menu ++++++++++++++++++++++++++++++++++++++++++++++

exports.getAllCategoryFormenu=(callback)=>{
    conn.query("select * from category",callback);
};

exports.savemenufromDB=(item_name, category_id, price, description, image,callback)=>{
    conn.query("insert into menu(item_name, category_id, price, description, image)values(?,?,?,?,?)",[item_name, category_id, price, description, image],callback);
};

// exports.ViewAllAdminMenus = (callback) => {
//     const sql = 'SELECT * FROM menu'; 
//     connection.query(sql, callback);
// };
// exports.ViewAllAdminMenus = (callback) => {
//     conn.query("SELECT menu.id, menu.item_name AS name, category.name AS category, menu.price, menu.description FROM menu JOIN category ON menu.category = category.id", callback);

// };

exports.ViewAllAdminMenus = (callback) =>{
    conn.query("select m.id,m.item_name AS name,c.name AS category,m.price, m.description from menu m join category c on m.category_id=c.id",callback);
}

