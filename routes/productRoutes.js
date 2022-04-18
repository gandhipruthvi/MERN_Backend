const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let Product = require("../models/Product");

//route Get api/products
//desc Get all Products
//access public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

//route Get api/product/:id
//desc Get product by id
//access public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }
    res.send(product);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});


// router.get("/products_by_id", authMiddleware, async (req, res) => {
//   try {

//     productIds = req.query.id

//     const product = await Product.find({ '_id': { $in: productIds } });
//     if (!product) {
//       return res.status(404).send("product not found");
//     }
//     res.send(product);

//   } catch (err) {
//     return res.status(500).send("Server error");
//   }
// });

//route Post api/product
//desc Insert product
//access public
router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price cannot be empty").notEmpty.isFloat({ decimal_digits: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newProduct = await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo,
      });

      res.send({ newProduct });
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//route Post api/product
//desc Update Product
//access public
router.put(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("price", "Price cannot be empty").notEmpty.isFloat({ decimal_digits: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const Product = await Product.findById(req.body.id);
      if (!Product) {
        return res.status(404).send("Product not found");
      }

      (Product.title = req.body.title),
        (Product.description = req.body.description),
        (Product.price = req.body.price),
        (Product.photo = req.body.photo),
        await Product.save();
      res.send(Product);
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
