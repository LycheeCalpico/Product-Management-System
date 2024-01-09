const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  removeOneProductFromCart,
} = require("../controllers/cart");
const router = express.Router();
router.get("/:userId", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/removeOne", removeOneProductFromCart);
module.exports = router;
