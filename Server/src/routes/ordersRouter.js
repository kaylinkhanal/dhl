const { Router } = require('express');
const app = Router();
const uploadMiddleware = require("../middleware/uploadMiddleware")
const ordersControllers = require("../controllers/ordersControllers")
const isAuthorized = require('../middleware/tokenAuthorize')

app.post('/orders', uploadMiddleware.orderUpload, ordersControllers.postOrder)

app.get('/orders', ordersControllers.getOrder)

// app.get('/filterOrders', ordersControllers.getFilteredOrders)

app.patch('/requestorder', ordersControllers.orderStatus)

app.put('/orders', ordersControllers.updateOrder)

app.delete('/orders', ordersControllers.deleteOrder)

app.post('/trackorders', ordersControllers.trackOrders)


module.exports = app;