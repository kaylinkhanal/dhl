const Orders = require('../models/orders')
const moment = require('moment')

const postOrder = async(req, res)=>{
    try{
        const formattedDate = moment(req.body.expectedDeliveryDate).format('YYYY/MM/DD')
        req.body.expectedDeliveryDate = formattedDate
        req.body.orderImg = req.file.originalname
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
}

const getOrder = async(req, res)=>{
    try{
        
        const size = req.query.size || 10
        const page = req.query.page
        const skipCount = (size * page - size)

        let orderData
        let totalOrderCount 
        if(page!==null){
             orderData = await Orders.find().skip(skipCount).limit(size)
             totalOrderCount =  await Orders.find().count()
        }else{
            orderData = await Orders.find()
        }
        if(orderData){
            res.json({
                ordersList: orderData,
                totalOrderCount: totalOrderCount
            })
        }
        
    }catch(err){
        console.log(err)
    }
}

const getFilteredOrders = async(req, res)=>{
    try{
        const filterOrders = await Orders.find(req.query)
        console.log(filterOrders)
        res.json({
            orderList : filterOrders
        })
    }catch(error){

    }
}

const orderStatus = async(req, res)=>{
    try{
      await Orders.findByIdAndUpdate(req.body.id,{orderStatus: req.body.status})
    }catch(err){
        console.log(err)
    }
}

const updateOrder = async(req, res)=>{
    try{
    const formattedDate = moment(req.body.expectedDeliveryDate).format('YYYY-MM-DD')
    req.body.expectedDeliveryDate = formattedDate
    const data = await Orders.findByIdAndUpdate(req.body._id, req.body)
    console.log(data);
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
}

const deleteOrder =  async(req, res)=>{
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
    }catch(err){
        console.log(err)
    }
}

exports.postOrder = postOrder;
exports.getOrder = getOrder;
exports.orderStatus = orderStatus;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.getFilteredOrders = getFilteredOrders;