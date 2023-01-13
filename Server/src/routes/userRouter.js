const { Router } = require('express');
const Orders = require('../models/orders')
const app = Router();
const moment = require('moment')


app.get('/users/:id/orders', async (req, res) => {
    try {
        const data = await Orders.find({ userID: req.params.id})
        console.log("i am  called")
        res.json({
            ordersList: data
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = app;