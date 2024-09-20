const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  codeno: String,
});

module.exports = mongoose.model("owner", ownerSchema);
