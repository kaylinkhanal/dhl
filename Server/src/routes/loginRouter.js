const { Router } = require('express');
const app = Router();
const loginControllers = require("../controllers/loginControllers")

app.post('/login',loginControllers.Login)

module.exports = app;