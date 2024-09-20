const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateToken } = require("../utils/generate_token");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("Account Exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpwd = await bcrypt.hash(password, salt);
    console.log(hashedpwd);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedpwd,
    });

    const token = generateToken(newUser);
    res.cookie("token", token);
    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ error: "user not found" });
    bcrypt.compare(password, user.password, function (error, result) {
      if (error)
        return res.status(401).json({ error: "internal server error" });
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/shop");
      } else {
        req.flash("email or password incorrect");
        return res.redirect('/')
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Internal Server Error" });
  }
};

module.exports.logOut = async (req,res) =>{
  res.cookie("token", '')
  res.redirect('/')
}
