const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateToken } = require("../utils/generate_token");
const { registerUser, loginUser , logOut} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/logout',logOut)

module.exports = router;
