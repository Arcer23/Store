const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  //yadi user sanga token xaina vane login paudaina
  if (!req.cookies.token) {
    req.flash('error', 'You Need to Login First')
    return res.redirect('/')
  }
  try {
    const decoded = jwt.verify(req.cookies.token, "arcerisagoodman");
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    req.user = user;

    next();
  } catch (error) {
    res.status(300).json({error:"error occured"})
  }
};
