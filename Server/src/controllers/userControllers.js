const bcrypt = require('bcrypt');
const saltRounds = 10;
const Orders = require("../models/orders");
const Users = require("../models/users");

const getUserOrderDetails = async (req, res) => {
    try {
      const data = await Orders.find({ userID: req.params.id });
      res.json({
        ordersList: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

const uploadAvatar = async (req, res, next) => {
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
  }
  
const getUserDetails =  async (req, res) => {
    try {
      const userData = await Users.findById(req.params.id)
      const {password, __v, ...refactoredData} = userData.toObject()
     
      res.json({
        user: refactoredData,
      });
    } catch (err) {
      console.log(err);
    }
  }
  
const changePassword = async (req, res, next) => {
    try {
      const data = await Users.findOne({ email: req.body.email });
      const dbPassword = data.password;
      const isValidPassword = bcrypt.compareSync( req.body.currentPassword, dbPassword);
  
      if (req.body.newPassword && isValidPassword) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.newPassword, salt);
        if (hash) {
          data.password = hash;
          const response = await Users.findByIdAndUpdate(data._id, data);
          if (response) {
            res.status(200).json({ msg: "Password Updated" });
          } else {
            res.status(500).json({ msg: "something went wrong" });
          }
        }
      } else {
        res.status(401).json({ msg: "Old Password doesn't matched" });
      }
      next();
    } catch (error) {
      console.error(error);
    }
  }

exports.getUserOrderDetails = getUserOrderDetails;
exports.uploadAvatar = uploadAvatar;
exports.getUserDetails = getUserDetails;
exports.changePassword = changePassword;