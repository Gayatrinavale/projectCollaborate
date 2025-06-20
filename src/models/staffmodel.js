const conn = require("../config/db.js");

const findStaffByNameAndEmail = (name, email, callback) => {
  const sql = 'SELECT * FROM staff WHERE TRIM(name) = ? AND TRIM(email) = ?';
  conn.query(sql, [name, email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = {
  findStaffByNameAndEmail,
};
