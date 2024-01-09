const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  token: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "customer",
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
