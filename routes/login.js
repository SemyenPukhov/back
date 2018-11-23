var express = require('express');
var router = express.Router();
// const User = require('../db/models/user');
const UserCntr = require('../controllers/user.cntr');


router.post('/', function(req, res) {
  console.log("call userLogin from login.js");
  console.log("send as args", req.body);
  UserCntr.userLogin(req, res);
});


module.exports = router;
