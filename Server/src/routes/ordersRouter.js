const { Router } = require("express");
const Orders = require("../models/orders");
const app = Router();
const moment = require('moment')

app.post('/orders', async(req, res)=>{
    try{
        const formattedDate = moment(req.body.expectedDeliveryDate).format('YYYY-MM-DD')
        req.body.expectedDeliveryDate = formattedDate
        const data = await Orders.create(req.body)
        if(data){
            res.json({
                msg: "order request has beenn sent, please wait until confirmation"
            })
        }else{
            res.json({
                msg: "something went wrong"
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.get('/orders', async(req, res)=>{
    try{
        const orderData = await Orders.find().sort({expectedDeliveryDate: -1})
        if(orderData){
            res.json({
                ordersList: orderData
            })
        }
        
    }catch(err){
        console.log(err)
    }
})

app.put('/orders', async(req, res)=>{
    try{
    const data = await Orders.findByIdAndUpdate(req.body._id, req.body)
    if(data){
        res.json({
            msg: "updated successfully"
        })
    }else{
        res.json({
            msg: "something went wrong"
        })
    }
    }catch(err){
        console.log(err)
    }
})

app.delete('/orders', async(req, res)=>{
    try{
    const data = await Orders.findByIdAndRemove(req.body.id)
    if(data){
        res.json({
            msg: "deleted successfully"
        })
    }else{
        res.json({
            msg: "something went wrong"
        })
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/orders", async (req, res) => {
  try {
    const data = await Orders.find(req.body);
    if (data) {
      res.json({
        ordersList: data
      });
    } else {
      res.json({
        msg: "something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
