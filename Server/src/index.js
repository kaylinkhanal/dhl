const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

require('dotenv').config()
const port = 5000

const cors = require('cors')
const bodyParser = require('body-parser')

const connect = require('./db/connect')
connect()

//1. import and coonect express=> socket
//2. io.on > connection established
// socket.on('requestOrder' < try to relate with app.post('/requestOrder')
const Orders = require('./models/orders')

io.on('connection', (socket) => {
  socket.on('requestOrder', async (orderDetails) => {
    //send to other connected clients
    io.emit('orderDetails', orderDetails)
    // console.log(orderDetails.id)
    const updatedResult = await Orders.findByIdAndUpdate({_id: orderDetails.id}, {orderStatus: orderDetails.status})
  });
});

app.use(bodyParser.json())
app.use(cors())
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const ordersRouter = require('./routes/ordersRouter');
const userRoute = require('./routes/userRouter');
const categoryRoute = require('./routes/categoryRouter');

app.use(registerRouter)
app.use(loginRouter)
app.use(ordersRouter)
app.use(userRoute)
app.use(categoryRoute)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
