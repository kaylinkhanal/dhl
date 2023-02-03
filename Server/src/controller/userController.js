const { Router, response } = require("express");
const Orders = require("../models/orders");
const Users = require("../models/users");
const app = Router();
const upload = require("../middleware/uploadMiddleware");

const getUser= async (req, res) => {
  try {
    const data = await Orders.find({ userID: req.params.id });
    res.json({
      ordersList: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const postUser= async (req, res, next) => {
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
};

const profilegetId= async (req, res) => {
  try {
    const userData = await Users.findById(req.params.id)
    const {password, __v, ...refactoredData} = userData.toObject()
   
    res.json({
      user: refactoredData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = getUser
exports.postUser = postUser
exports.profilegetId = profilegetId
