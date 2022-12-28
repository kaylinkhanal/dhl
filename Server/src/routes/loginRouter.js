const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/login', async(req, res) => {
    try{
        const data = await Users.create(req.body)
        if(data){
            res.json({
                msg: 'You are logged in'
            })
        }else{
            res.json({
                msg: 'Invalid cred'
            })
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = app;