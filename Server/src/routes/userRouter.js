const { Router, response } = require('express');
const Orders = require('../models/orders')
const Users = require('../models/users')
const app = Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Client/src/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage }).single('avatar')

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

app.post('/profile/:name', upload, function (req, res, next) {
  })

app.get('/profile/:name',  async(req, res)=> {
    try{
        const userData = await Users.find({ name: req.params.name})
        res.json({
            user: userData
        })
    }catch(err){
        console.log(err)
    }
})

module.exports = app;