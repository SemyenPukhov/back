const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserCntr = require('../controllers/user.cntr');


router.post('/', checkAuth, function(req, res) {
  console.log("delete completed from deleteCompleted.js");
  UserCntr.deleteCompleted(req, res);
});


module.exports = router;
