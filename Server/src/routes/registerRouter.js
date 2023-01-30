const { Router } = require('express');
const app = Router();
const registerController = require("../controllers/registerController")

app.post('/register',registerController.registerUser)

module.exports = app;