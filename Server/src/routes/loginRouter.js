const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/login', async(req, res) => {
    try{
    const data = await Users.findOne({email: req.body.email})
    
    if(data){
        const dbPassword = data.password
        console.log(data.password)
        const isValidPassword = bcrypt.compareSync(req.body.password, dbPassword)
        const {password, __v, ...refactoredData} = data.toObject()
        if(isValidPassword){
            res.json({
                msg: 'login success',
                userDetails: refactoredData
            })
        }else{
            res.json({
                msg: 'password did not match'
            })
        }
    }else{
        res.json({
            msg: 'invalid credentials'
        })
    }
 

    }catch(err){
        console.log(err)
    }
})

app.put("/changepassword", async (req, res, next) => {
    try {
      const data = await Users.findOne({ email: req.body.email });
      const dbPassword = data.password;
      const isValidPassword = bcrypt.compareSync(
        req.body.currentPassword,
        dbPassword
      );
  
      if (req.body.newPassword === req.body.confirmPassword && isValidPassword) {
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
  });

module.exports = app;