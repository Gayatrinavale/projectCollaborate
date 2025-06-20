// routes/staffRoutes.js

const express = require('express');
const router = express.Router();
const staffCtrl = require('../controller/staffCtrl');

router.get("/staffLogin", staffCtrl.Login);
router.post("/stafflogin", staffCtrl.stafflogin);

module.exports = router;
