const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/login', async(req, res) => {
    try{
        const data = await Users.findOne({email: req.body.email})
        
        if(data){
            const {password} = data
            const isValidPassword = bcrypt.compareSync(req.body.password, password)
            if(isValidPassword){
                req.json({
                    msd: 'login success'
                })
            }else{
                res.json({
                    errmsg: 'password did not match'
                })
            }
        }else{
            res.json({
                errmsg: 'invalid credentials'
            })
        }
        // console.log(req.body) 
    }catch(err){
        console.log(err)
    }
})

module.exports = app;