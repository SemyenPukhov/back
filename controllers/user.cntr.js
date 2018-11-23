const express = require('express')
  , router = express.Router()
  , User = require('../db/models/user')
  , db = require('../db')
  , _ = require('lodash')
  , crypto = require('crypto')
  , jwt = require('jsonwebtoken')
  , checkAuth = require('../middleware/check-auth');

const pathArr = [
  '../../images/avatars/0.jpg',
  '../../images/avatars/1.jpeg',
  '../../images/avatars/2.jpg',
  '../../images/avatars/3.jpeg',
  '../../images/avatars/4.jpg'
];
const hash = password => {
  return crypto.createHash('sha1').update(password).digest('base64')
}

exports.addUser = function(req, res) {

  const { firstName, lastName, nickName, mail, password } = req.body;

  let responseObj = {
    regError: false,
    isExist: false,
  };

  function randomInteger(min, max) {
   let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  const userData = {
    firstName,
    lastName,
    nickName,
    mail,
    "password": hash(password),
    "avatarPath": pathArr[randomInteger(0, pathArr.length - 1)],
    "todos": [],
  };

  let newUser = new User({
    ...userData,
  });

  User.findOne({mail: userData.mail}, (err, obj) => {
    if (_.isNil(obj)) {
      console.log("Is Unique");
      newUser.save(err => {
        if (!err) {
          res.status(200);
          res.send(responseObj);
        }
        else {
          res.status(500);
          responseObj.regError = true;
          res.send(responseObj);
        }
      });
    }
    else {
      console.log("already exist");
      responseObj.regError = true;
      responseObj.isExist = true;
      res.status(200);
      res.send(responseObj);
    }
  });
}

exports.userLogin = function (req, res) {
  const { mail, password } = req.body;
  console.log("call user login with data: ", req.body);
  User.find({ mail })
    .exec()
    .then(user => {
      const hashPassword = hash(password);
      if (!_.isEmpty(user)) {
        if (user[0].password === hashPassword) {
          const token = jwt.sign({
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            mail: user[0].mail,
            nickName: user[0].nickName,
            todos: user[0].todos,
          }, "secret", {
            expiresIn: "1h",
          });
          res.status(200).json({
            isLogin: true,
            isExist: true,
            isAdmin: user[0].mail === "admin@mail.ru" ? true : false,
            rightPassword: true,
            token: token,
            userObj: {
              nickName: user[0].nickName,
              todos: user[0].todos,
            },
          });
        } else {
          console.log("Wrong password");
          res.status(401).json({
            mailError: false,
            passwordError: true,
          });
        }
    }
    else {
        console.log("user doesnt't exist");
        res.status(401).send({
          mailError: true,
          passwordError: false,
        });
      }
    })
    .catch(err => {
      console.log("Catch error");
      // //user doesnt'exist
      // console.log("user doesnt't exist");
      // res.status(401).send({
      //   mailError: true,//   passwordError: false,
      // });
    });
}

exports.addTodo = function(req, res) {
  //userData should define in my middleware
  console.log(req.body);
  const { userData, todo } = req.body;
  User.findOne({mail: userData.mail}, (err, user) => {
    user.todos.push({text: todo, completed: false});

    user.save(err => {
      if (err) {
        console.log("Add todo ERROR server log");
      }
      else {
        console.log("Todo was successfuly add to user todos");
        res.status(200).json({
          todos: user.todos,
        });
      }
    })
  });
}

exports.getAllUsers = function(req, res) {
  console.log(req.body);
  const { userData } = req.body;

  if (userData.mail === "admin@mail.ru") {
    let usersArr = [];
    User.find({}, (err, users) => {
      for (let i = 0; i < users.length; i++) {
        usersArr[i] = {
          mail: users[i].mail,
          id: users[i]._id,
          nickName: users[i].nickName,
          avatarPath: users[i].avatarPath,
        };
      }
      res.status(200).json({
        users: usersArr,
      });
    });
  }
  else {
    res.status(200).json({
      message: "Permission dined",
    });
  }
}

exports.deleteUser = function(req, res) {
  const { mail, userData } = req.body;
  if (mail !== "admin@mail.ru") {
    if (userData.mail === "admin@mail.ru") {
      User.findOneAndDelete({mail: mail}, err => {
        if (err) {
          console.log(err);
          res.status(200);
        }
        else {
          let usersArr = [];
          User.find({}, (err, users) => {
            for (let i = 0; i < users.length; i++) {
              usersArr[i] = {
                mail: users[i].mail,
                id: users[i]._id,
                nickName: users[i].nickName,
              };
            }
            res.status(200).json({
              users: usersArr,
            });
          });
        }
      });
    }
  }
}


/*User.findOneAndRemove({_id: req.params.id}, (err) => {
    if (err) {
      req.flash("error", err);
      return res.redirect("/user/edit");
    }

    req.flash("success", "Your account has been deleted.");
    req.logout();
    return res.redirect("/shop/coffee");
  });*/

exports.toggleTodo = function(req, res) {
  const { userData, _id : id } = req.body;
  User.findOne({mail: userData.mail}, (err, user) => {
    for (let i = 0; i < user.todos.length; i++) {
      if (user.todos[i]["id"] === id) {
        console.log("EQUAL");
        user.todos[i].completed = !user.todos[i].completed;
      }
    }
    user.save(err => {
      if(err) {
        console.log("Toggle todo ERROR server log");
      }
      else {
        res.status(200).json({
          todos: user.todos,
        });
      }
    });
  });

}

exports.completeAll = function(req, res) {
  const { userData } = req.body;

  User.findOne({mail: userData.mail}, (err, user) => {

    for (let i = 0; i < user.todos.length; i++) {
        user.todos[i].completed = true;
    }

    user.save(err => {
      if(err) {
        console.log("Complete all error server");
      }
      else {
        res.status(200).json({
          todos: user.todos,
        });
      }
    });
  });

}

exports.deleteCompleted = function(req, res) {
  const { userData } = req.body;

  User.findOne({mail: userData.mail}, (err, user) => {


    let newTodos = [];
    for (let i = 0; i < user.todos.length; i++) {
      if (!user.todos[i].completed)
        newTodos.push(user.todos[i]);
    }
// [...user.todos]
    user.todos = newTodos;
    // user.todos.filter(todo => {
    //   return !todo.completed;
    // });
    // for (let i = 0; i < user.todos.length; i++) {
    //   user.todos[i].completed = true;
    // }

    user.save(err => {
      if(err) {
        console.log("Delete completed error server");
      }
      else {
        res.status(200).json({
          todos: user.todos,
        });
      }
    });
  });

}

exports.editProfile = function(req, res) {
  const { userData, newField } = req.body;
  // console.log(newField);
  // console.log(userData.mail);

  User.findOne({mail: userData.mail}, (err, user) => {
    console.log("user from findOne", user);
    for (let key in newField) {
      console.log("Key: ", key, "value: ", newField[key]);
      user[key] = newField[key];
    }
    console.log("after for: ", user);

    user.save(err => {
      if (err) {
        console.log("Save error");
        res.status(200).json({
          saveError: true,
        });
      }
      else {
        res.status(200).json({
         saveError: false,
        });
      }
    });
  });



}




