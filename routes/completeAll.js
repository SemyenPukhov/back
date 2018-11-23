var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserCntr = require('../controllers/user.cntr');


router.post('/', checkAuth, function(req, res) {
  console.log("complete all from completeAll.js");
  UserCntr.completeAll(req, res);

});


module.exports = router;
