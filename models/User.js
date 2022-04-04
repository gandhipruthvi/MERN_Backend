<<<<<<< HEAD
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

=======
//-----------------Import---------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//---------------Define Schema-----------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
const userSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
  },
});

<<<<<<< HEAD
=======
//------------Export---------------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
module.exports = mongoose.model("User", userSchema);
