// var db = require('../db');
//
// const express = require('express')
//   , router = express.Router()
//   , User = require('../db/models/user');
//
// exports.addUser = function(body, cb) {
//   const userData = {
//     "firstName": body.firstName,
//     "lastName": body.lastName,
//     "nickName": body.nickName,
//     "mail": body.mail,
//     "password": body.password,
//   };
//   console.log("data from user model", userData);
//   let newUser = new User({
//     ...userData,
//   });
//
//   console.log(newUser.save);
//
//   newUser.save(cb);
//
//   // newUser.save(function(err) {
//   //   if (!err) {
//   //     console.log("Success");
//   //     res.status(200).send("New user was saved...");
//   //     return;
//   //   }
//   //   else {
//   //     console.log("!!!ERROR");
//   //   }
//   // });
//
//   console.log("Last line");
// }
// var hash = function(s) {
//   return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
// }
//
// /*add new user*/
// exports.addUser = function(name, mail, password, cb) {
//   var user = {
//     name: name,
//     email: email,
//     password: hash(password),
//   };
//
//   db.save(user, cb);
// }
//
// /*get define user*/
//
//
// /*get all users*/
// exports.getAllUsers = function(cb) {
//   db.fetch({}, cb)
// }

// exports.users = function (users) {
//   console.log("in db var ", db);
//   console.log("call with user model with qweqweqwe:" , users);
//   console.log();
// }

//
// let newUser = new User({
//   ...userData,
// });
//
// newUser.save(function (err) {
//   if(err) {
//     console.log(err);
//     return;
//   }
//   else {
//     res.status(200).send("New user was saved...");
//   }
// });
