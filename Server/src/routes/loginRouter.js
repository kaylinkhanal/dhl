const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/login', async(req, res) => {
    try{
        const registeredUser = await Users.findOne({email: req.body.email})
    }catch(err){
        console.log(err)
    }
})


module.exports = app;