const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserCntr = require('../controllers/user.cntr');


router.post('/', checkAuth, function(req, res) {
  console.log("edit profile from editProfile.js");
  UserCntr.editProfile(req, res);
});


module.exports = router;
