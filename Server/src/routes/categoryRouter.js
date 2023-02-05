const { Router } = require('express');
const app = Router();
const categoryController = require("../controllers/categoryControllers")

app.post('/category',categoryController.postCategory)

app.get('/category',categoryController.getCategory)

app.put('/category',categoryController.updateCategory)

app.delete('/category',categoryController.deleteCategory)

module.exports = app;