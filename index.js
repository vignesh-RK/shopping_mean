const express = require('express')
require('./db/mongodb')
const itemRouter = require('./routers/items')
const orderRouter = require('./routers/orders')
const cors = require('cors');
const path = require('path')

const port = process.env.PORT || 3000

const app = express()
const publicDirectoryPath = path.join(__dirname, '/shopping-app/dist/shopping-app')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use('/api',itemRouter)
app.use('/api',orderRouter)
app.use(cors());

app.listen(port, () => {
    console.log('Server is up on port '+port)
})