const { Router, response } = require("express");
const Orders = require("../models/orders");
const Users = require("../models/users");
const app = Router();
const upload = require("../middleware/uploadMiddleware");

app.get("/users/:id/orders", async (req, res) => {
  try {
    const data = await Orders.find({ userID: req.params.id });
    res.json({
      ordersList: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/profile/:id", upload, async (req, res, next) => {
  try {
    const data = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      { avatarFileName: req.file.originalname }
    );
    if (data) {
      res.json({
        msg: "avatar upload success!!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const userData = await Users.findById(req.params.id)
    const {password, __v, ...refactoredData} = userData.toObject()
   
    res.json({
      user: refactoredData,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
