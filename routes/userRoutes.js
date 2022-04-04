const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let User = require("../models/User");

//route Post api/user
//desc Insert user
//access public
router.post(
  "/",
  [
    check("email", "Please enter valid email").notEmpty().isEmail(),
    check("username", "Username is required").notEmpty(),
    check("password", "Password need to be 4 char or more").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const salt = await bcrypt.genSalt(10);
      let newPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: newPassword,
      });

      const payload = {
        user: {
          id: newUser.id,
          username: newUser.username,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

//route Put api/user
//desc Update user
//access public
router.put(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").notEmpty().isEmail(),
    check("phone", "Phone should be 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    check("address", "Address is required").notEmpty(),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.body._id);
      if (!user) {
        return res.status(404).send("user not found");
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      await user.save();
      res.send(user);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
