const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');

app.post('/login', async(req, res) => {
    try{
    const data = await Users.findOne({email: req.body.email})
    
    if(data){
        const dbPassword = data.password
        console.log(data.password)
        const isValidPassword = bcrypt.compareSync(req.body.password, dbPassword)
        const {password, _id, __v, ...refactoredData} = data.toObject()
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


module.exports = app;