var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserCntr = require('../controllers/user.cntr');


router.post('/', checkAuth, function(req, res) {
  console.log("call toggle TODO from toggleTodo.js");
  UserCntr.toggleTodo(req, res);
  // res.status(200).json({
  //   message: "user verify",
  // });
  // console.log("send as args", req.body);
  // UserCntr.userLogin(req, res);
});


module.exports = router;
