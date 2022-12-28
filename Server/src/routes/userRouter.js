const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/register', async(req, res) => {
    try{
        const data = await Users.create(req.body)
        if(data){
            res.json({
                msg: 'user is registered'
            })
        }else{
            res.json({
                msg: 'something went wrong'
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.get('/register', async(req, res) => {
    try{
        const email = await Users.findOne(req.body.email)
        const password = await Users.findOne(req.body.password)
        debugger;
        if(email === req.body.email && password === req.body.password){
            res.json({
                msg: 'login success'
            })
        }else{
            res.json({
                msg: 'something went wrong'
            })
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = app;