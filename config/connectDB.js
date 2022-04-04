<<<<<<< HEAD
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

=======
//--------------Import-------------------
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//--------------Define connection to Database----------------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log("unable to connect" + error.message);
  }
};

<<<<<<< HEAD
=======
//--------------Export--------------------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
module.exports = connectDB;
