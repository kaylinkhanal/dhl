const { Router } = require('express');
const Weight = require('../models/weight')
const app = Router();

app.post('/weight', async(req, res)=>{
    try{
        // res.send(req.body)
        const weightData = await Weight.create(req.body)
        if(weightData){
            res.json({
                msg: 'added per unit price'
            })
        }else{
            res.json({
                errmsg: 'something went wrong'
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.get('/weight', async(req, res)=>{
    try{
        const data = await Weight.find()
        if(data){
            res.json({
                priceDetail: data
            })
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = app;