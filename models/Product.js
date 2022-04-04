<<<<<<< HEAD
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

=======
//--------------Import-------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//---------------Define Schema----------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
const productSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

<<<<<<< HEAD
=======
//---------------Export----------------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
module.exports = mongoose.model("Product", productSchema);
