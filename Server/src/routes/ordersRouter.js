const { Router } = require("express");
const Orders = require("../models/orders");
const app = Router();

app.post("/orders", async (req, res) => {
  try {
    const data = await Orders.create(req.body);
    if (data) {
      res.json({
        msg: "order request has been sent, please wait until confirmation",
      });
    } else {
      res.json({
        msg: "something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/orders", async (req, res) => {
  try {
    const data = await Orders.find(req.body);
    if (data) {
      res.json({
        ordersList: data
      });
    } else {
      res.json({
        msg: "something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
