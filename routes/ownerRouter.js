const express = require("express");
const router = express.Router();
const ownerModel = require("./../models/owner-model");
router.get("/", (req, res) => {
  res.send("this is owners Page");
});

router.post("/create", async (req, res) => {
  const owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .send(503)
      .send("You dont have the permisson to create a new owner");
  }
  const { name, email, password } = req.body;
  const createdOwner = await ownerModel.create({
    name,
    email,
    password,
  });
  res.status(201).send(createdOwner);
});

router.get("/admin", function (req, res) {
  let success = req.flash("success");

  res.render("createproducts", { success });
});

module.exports = router;
