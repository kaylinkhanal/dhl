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
const usersRouter = require('./routes/usersRouter');
const ordersRouter = require('./routes/ordersRouter');
app.use(registerRouter)
app.use(loginRouter)
app.use(ordersRouter)
app.use(usersRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
