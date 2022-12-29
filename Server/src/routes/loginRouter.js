const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/login',(req,res)=>{
    console.log(req.body)
})
module.exports=app;