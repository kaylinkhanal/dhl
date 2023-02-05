const { Router } = require("express");
const app = Router();
const uploadMiddleware = require("../middleware/uploadMiddleware");
const ordersControllers = require("../controllers/ordersControllers");
const generatePdf = require("../controllers/generatePdfController");
const isAuthorized = require("../middleware/tokenAuthorize");

app.post("/orders", uploadMiddleware.orderUpload, ordersControllers.postOrder);

app.get("/orders", ordersControllers.getOrder);

app.patch("/requestorder", ordersControllers.orderStatus);

app.put("/orders", ordersControllers.updateOrder);

app.delete("/orders", ordersControllers.deleteOrder);

app.post("/searchdelivery", ordersControllers.searchDelivery);

app.post("/pdf", generatePdf.generatePdf);

module.exports = app;
