const { Router } = require('express');
const Users = require('../models/users')
const app = Router();

app.post('/login', async(req, res) => {
    try{
        // res.send(req.body)
        const registeredUser = await Users.findOne({email: req.body.email})

        if(registeredUser){
            res.json({
                userdata: registeredUser,
                msg: `you're logged in`
            })
        }else{
            res.json(
                {
                    msg: "Invalid username or password"
                }
            )
        }
        
    }catch(err){
        console.log(err)
    }
})


module.exports = app;