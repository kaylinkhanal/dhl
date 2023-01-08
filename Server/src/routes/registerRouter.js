const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/register', async(req, res) => {
    try{
      const email = await Users.findOne({email: req.body.email})
      if(!email){
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        if(hash){
            req.body.password = hash
           const data = await Users.create(req.body)
           if(data){
             res.json({msg: 'users registered'})
           }else{
             res.json({errMsg: 'something went wrong'})
           }
        }
      }else{
        res.json({errMsg: 'email already exist'})
      }
    }catch(err){
        console.log(err)
    }

})


module.exports = app;