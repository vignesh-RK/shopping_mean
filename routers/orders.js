const express = require('express')
const Order = require('../models/orders')
const router = new express.Router()

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/orders', async (req, res) => {
    const order = new Order(req.body)

    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)

        if (!order) {
            res.status(404).send()
        }

        res.send(order)
    } 
    catch (e) {
        res.status(500).send()
    }
})

module.exports = router