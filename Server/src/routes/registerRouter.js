const { Router } = require("express");
const Users = require("../models/users");
const app = Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/register", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = await Users.findOne({ email: req.body.email }).exec();
    if (hash) {
      req.body.password = hash;
      if (email == null) {
        const data = await Users.create(req.body);
        if (data) {
          res.json({ msg: "users registered" });
        } else {
          res.json({ msg: "something went wrong" });
        }
      } else {
        res.json({ msg: "email already exist please enter another email" });
      }
    }
  } catch (err) {
    console.log(err);
  }
  next();
});

module.exports = app;
