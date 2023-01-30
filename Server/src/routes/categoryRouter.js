const { Router } = require('express');
const app = Router();
const categoryController = require("../controllers/categoryControllers")

app.post('/category',categoryController.postCategory)

app.get('/category',categoryController.getCategory)

module.exports = app;