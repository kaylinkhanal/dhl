const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/register', async(req, res) => {
    // console.log(req.body)

    try{
    const registeredData=await Users.findOne({email:req.body.email});

    if(registeredData){
        res.json({
            msg:"username is already registered"
        })
    }
    else{
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

    }
        
    }catch(err){
        console.log(err)
    }
})


module.exports = app;