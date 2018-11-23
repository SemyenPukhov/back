const mongoose = require('mongoose');
//
// const UserSchema = mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   nickName: {
//     type: String,
//     required: true,
//   },
//   mail: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });
//
// const User = module.exports = mongoose.model('Users', UserSchema);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarPath: {
      type: String,
  },
  // todos: {
  //     type: Array,
  //     required: true,
  // }
  // todos: {
  //     type: Array, "default": [],
  // },
    todos: [{
      text: String, completed: Boolean,
    }],
  // trk : { type : Array , "default" : [] }


  // [{
  //   lat : String,
  //   lng : String
  // }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;




