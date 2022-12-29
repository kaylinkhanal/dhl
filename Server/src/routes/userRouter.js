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
app.get('/login', async(req,res)=>{
    try{
        const data = await Users.findOne(req.body)
        if (data){
            res.json({
                msg: 'you are successfully login'
            })
           
        }else{
            if(!data){
                res.json({
                    msg: 'Something went wrong'
                })
            }
           

        }

    }catch(err){
        console.log(err)

    }
})

module.exports = app;