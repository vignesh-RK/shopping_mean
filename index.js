const express = require('express')
require('./db/mongodb')
const itemRouter = require('./routers/items')
const orderRouter = require('./routers/orders')
const cors = require('cors');


const app = express()


app.use(express.json())
app.use('/api',itemRouter)
app.use('/api',orderRouter)
app.use(cors());
app.listen(8080, () => {
    console.log('Server is up on port 8080')
})