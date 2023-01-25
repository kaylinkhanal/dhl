const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
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
io.on('connection', (socket) => {
  socket.on('requestOrder', (orderDetails) => {
    //send to other connected clients
    io.emit('orderDetails',orderDetails)
    //
  });
});



app.use(bodyParser.json())
app.use(cors())
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const ordersRouter = require('./routes/ordersRouter');
const userRoute = require('./routes/userRouter');

app.use(registerRouter)
app.use(loginRouter)
app.use(ordersRouter)
app.use(userRoute)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
