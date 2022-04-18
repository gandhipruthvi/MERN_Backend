const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

let Bid = require("../models/Bid");

//route Get api/bid
//desc Get all Bids
//access public
router.get("/onProduct/:id", authMiddleware, async (req, res) => {
  try {
    const bid = await Bid.findOne({ productId: req.params.id }).sort({
      date: -1,
    });
    if (!bid) {
      return res.status(404).send("bid not found");
    }
    res.send(bid);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

//route Get api/bid/:id
//desc Get Bid by id
//access public
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).send("bid not found");
    }
    res.send(bid);
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

//route Post api/bid
//desc Insert bid
//access public
router.post(
  "/",
  [
    check("productId", "Product Id is required").notEmpty(),
    check("bid", "Bid price is required").notEmpty().isInt({ min: 1 }),
  ],
  authMiddleware,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newBid = await Bid.create({
        productId: req.body.productId,
        userId: req.body.userId,
        bid: req.body.bid,
      });

      res.send({ newBid });
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
