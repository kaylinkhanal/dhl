const { Router } = require('express');
const app = Router();
const categoryController = require("../controllers/categoryControllers")

app.post('/category',categoryController.postCategory)

app.get('/category',categoryController.getCategory)

app.delete('/category',categoryController.deleteCategory)

app.put('/category',categoryController.productCategory)



module.exports = app;