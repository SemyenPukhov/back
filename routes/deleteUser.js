const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserCntr = require('../controllers/user.cntr');


router.post('/', checkAuth, function(req, res) {
  console.log("delete user from deleteUser.js");
  UserCntr.deleteUser(req, res);
});


module.exports = router;
