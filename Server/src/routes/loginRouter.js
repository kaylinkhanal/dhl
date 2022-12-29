const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/', async(req, res) => {
    try{
        const data = await Users.create(req.body)
        if(data){
            res.json({
                msg: 'Login Success'
            })
        }else{
            res.json({
                msg: 'Invalid creds'
            })
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = app;