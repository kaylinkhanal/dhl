const { Router , static} = require('express');
const Orders = require('../models/orders')
const app = Router();
const moment = require('moment')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Client/src/uploads')
    },
    filename: function (req, file, cb) {
    console.log(file)
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/profile', upload.single('avatar'), function (req, res, next) {

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })
  
app.get('/users/:id/orders', async (req, res) => {
    try {
        const data = await Orders.find({ userID: req.params.id})
        res.json({
            ordersList: data
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = app;