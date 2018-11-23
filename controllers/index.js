const express = require('express')
  , router = express.Router()
  , registration = require('../routes/registration')
  , login = require('../routes/login')
  , addTodo = require('../routes/addTodo')
  , completeAll = require('../routes/completeAll')
  , deleteCompleted = require('../routes/deleteCompleted')
  , editProfile = require('../routes/editProfile')
  , getAllUsers = require('../routes/getAllUsers')
  , deleteUser = require('../routes/deleteUser')
  , toggleTodo = require('../routes/toggleTodo');


router.use('/reg', registration);
router.use('/login', login);
router.use('/add', addTodo);
router.use('/toggle', toggleTodo);
router.use('/completeall', completeAll);
router.use('/deleteCompleted', deleteCompleted);
router.use('/editprofile', editProfile);
router.use('/all', getAllUsers);
router.use('/deleteUser', deleteUser);
//deleteuser


module.exports = router;


//app.use('/users', usersRouter);
// router.use('/comments', require('./comments'))
// router.use('/users', require('./users'))