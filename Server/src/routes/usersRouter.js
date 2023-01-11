const { Router } = require('express');
const Orders = require('../models/orders')
const app = Router();
const moment = require('moment')


app.get('/users/:id/orders', async(req, res)=>{
    try{
        const orderData = await Orders.find().sort({expectedDeliveryDate: -1})
        res.json({
            orderData: orderData
        })
    }catch(err){
        console.log(err)
    }
})




module.exports = app;