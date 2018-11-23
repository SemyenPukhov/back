var mongoose = require('mongoose');
//reactDbApp
const url = "mongodb://localhost:27017/reactDbApp";

const options = {
  useNewUrlParser: true,
}

mongoose.Promise = global.Promise;

mongoose.connect(url);

var db = mongoose.connection;

db.on('open', function() {
  console.log("Ready to use...");
});

db.on('error', () => {
  console.log("Database connection error...");
});

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   nickName: String,
//   mail: String,
//   password: String,
// });

// mongoose.connect(url).then(
//   () => {console.log("Ready to use");},
//   err => {console.log("Error");}
// );




// var db = mongoose.connection;
//
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connected...");
// });
//
//
//
module.exports = db;
