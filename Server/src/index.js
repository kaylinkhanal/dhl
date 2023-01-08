const app = require('express')()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')

const connect = require('./db/connect')
connect()

app.use(bodyParser.json())
app.use(cors())
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const ordersRouter = require('./routes/ordersRouter');
const sizeRouter = require('./routes/sizeRouter');
const weightRouter = require('./routes/weightRouter')
app.use(registerRouter)
app.use(loginRouter)
app.use(ordersRouter)
app.use(sizeRouter)
app.use(weightRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
