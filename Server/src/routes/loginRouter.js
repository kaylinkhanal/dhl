const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');

app.post('/login', async(req, res) => {
    try{
    const data = await Users.findOne({email: req.body.email})
    if(data){
        const {password} = data
        const isValidPassword = bcrypt.compareSync(req.body.password, password)
        if(isValidPassword){
            res.json({
                msg: 'login success'
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


module.exports = app;