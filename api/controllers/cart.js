const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  const userID = req.query.userID;
  try {
    const cart = await Cart.findOne({ owner: userID }).populate({
      path: "items.product",
      model: "Product",
    });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const userID = req.body.userID;
    const cart = await Cart.findOne({ owner: userID });
    if (!cart) {
      const newCart = await Cart.create({
        owner: userID,
        items: { product: req.body.product.productID, quantity: 1 },
      });

      await newCart.save();
    } else {
      const product = req.body.product.productID;
      // const productStockQuantity = req.body.product.productQuantity;
      const item = cart.items.find((i) => i.product == product);
      if (item) {
        item.quantity += 1;
        // update stock quantity in DB
      } else {
        cart.items.push({ product: product, quantity: 1 });
      }
      await cart.save();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userID = req.body.userID;
    const cart = await Cart.findOne({ owner: userID });
    const product = req.body.product.productID;
    const item = cart.items.find((i) => i.product == product);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart.items.remove(item);
      }
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeOneProductFromCart = async (req, res) => {
  try {
    const userID = req.body.userID;
    const cart = await Cart.findOne({ owner: userID });
    const product = req.body.product.productID;
    const item = cart.items.find((i) => i.product == product);
    if (item) {
      cart.items.remove(item);
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  removeOneProductFromCart,
};
