<<<<<<< HEAD
const jwt = require("jsonwebtoken");

require("dotenv").config();

=======
//-----------Import-------------------
const jwt = require("jsonwebtoken");
require("dotenv").config();

//----------Define the Middleware------------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json({ msg: "No token, authorization denied" });
  }

<<<<<<< HEAD
  //verify token
=======
//-----------verify token------------
>>>>>>> 463788e6b79ef3254d59b7ebd686e8bd4ee8acd7
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
