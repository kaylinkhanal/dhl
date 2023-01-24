const app = require('express')()
require('dotenv').config()
const port = 5000
const cors = require('cors')
const bodyParser = require('body-parser')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const connect = require('./db/connect')
connect()

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

const Orders = require('./models/orders')

io.on("connection", (socket) => {
  // console.log('socket connected,', socket.id)
  socket.on('requestOrder', async(orderDetails)=>{
    io.emit('orderDetails', orderDetails)
    // console.log(orderDetails)
    // console.log(orderDetails.id)
    const updatedResult = await Orders.findByIdAndUpdate({_id: orderDetails.id}, {orderStatus: orderDetails.status})
    console.log(updatedResult)
  })

});

// app.post('/requestorder', async(req, res)=>{

// })

server.listen(port, () => {
  console.log('listening on 5000');
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
