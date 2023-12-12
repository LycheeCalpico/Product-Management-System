const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Users = require("./models/User");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dsadsadS43tr4rwfdg";
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

mongoose.connect(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (passwordMatch) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          else res.cookie("token", token).json("Password OK");
        }
      );
    } else res.status(422).json("Wrong password");
    res.json("User Find");
  } else res.json("User not found");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.create({
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
