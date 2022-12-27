const app = require('express')()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
const connect = require('./db/connect')
connect()
const user = require('./routes/userRouter');
app.use(user)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
