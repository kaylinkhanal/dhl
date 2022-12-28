const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/login', async(req, res) => {
    try{
        // console.log(req.body)
        const registeredUser = await Users.findOne({email: req.body.email})

        if(registeredUser){
            res.json({
                userdata: registeredUser,
                msg: `you're logged in`
            })
        }else{
            res.json({
                errmsg: 'invalid '
            })
        }
        
    }catch(err){
        console.log(err)
    }

})


module.exports = app;