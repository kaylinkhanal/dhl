const { Router } = require('express');
const Size = require('../models/size')
const app = Router();

app.post('/size', async(req, res)=>{
    try{
        // res.send(req.body)
        const sizeData = await Size.create(req.body)
        if(sizeData){
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

app.get('/size', async(req, res)=>{
    try{
        const data = await Size.find()
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