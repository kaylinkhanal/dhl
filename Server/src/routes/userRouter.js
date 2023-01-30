const { Router } = require("express");
const app = Router();
const uploadMiddleware = require("../middleware/uploadMiddleware");
const userController = require("../controllers/userControllers")

app.get("/users/:id/orders", userController.getUserOrderDetails);

app.post("/profile/:id", uploadMiddleware.avatarUpload, userController.uploadAvatar);

app.get("/profile/:id",userController.getUserDetails);

app.put("/changepassword",userController.changePassword);

module.exports = app;
