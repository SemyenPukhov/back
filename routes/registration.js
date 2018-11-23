var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const User = require('../db/models/user');
const UserCntr = require('../controllers/user.cntr');

// router.post('/', function (req, res) {
//   console.log("Catch post req");
//   console.log(req.headers);
//   console.log(req.body);
//   res.status(200).send("Server response with sc 200"); //вынести в контроллер
// })


router.post('/', function(req, res) {
  console.log("call addUser from registration.js");
  console.log("send as args", req.body);
  UserCntr.addUser(req, res);
});




// router.post('/', function(req, res) {
//   //call function from userModel
//   console.log(req.body);
//   const userData = {
//     "firstName": req.body.firstName,
//     "lastName": req.body.lastName,
//     "nickName": req.body.nickName,
//     "mail": req.body.mail,
//     "password": req.body.password,
//   };
//
//   let newUser = new User({
//     ...userData,
//   });
//
//   console.log("call from user.cnt",  userData);
//
//   newUser.save(function(err) {
//     if (!err) {
//       console.log("Success");
//       // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//       res.status(200).send("New user was saved...");
//       return;
//     }
//     else {
//       console.log("!!!ERROR");
//     }
//   });
// });



module.exports = router;
