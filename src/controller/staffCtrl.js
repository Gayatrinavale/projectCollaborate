const Staff = require('../models/staffmodel.js');

exports.Login = (req, res) => {
  res.render("stafflogin", { msg: "" });
};

exports.stafflogin = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.render("stafflogin", { msg: "Both fields are required" });
  }

  Staff.findStaffByNameAndEmail(name.trim(), email.trim(), (err, user) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Server error");
    }

    if (!user) {
      return res.render("stafflogin", { msg: "Invalid credentials" });
    }

    res.render("staffdashboard", { name: user.name });
  });
};
