const { Router } = require('express');
const Users = require('../models/users')
const app = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/register', async(req, res) => {
    try{
        // console.log(req.body)
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt)
        
        if(hash){
            req.body.password = hash
            const data = await Users.create(req.body)

            if(data){
                req.json({
                    msg: 'user registered'
                })
            }else{
                req.json({
                    errmsg: 'somthing went wrong'
                })
            }
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = app;