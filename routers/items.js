const express = require('express')
const Items = require('../models/items')
const router = new express.Router()


router.get('/items', async (req, res) => {
    try {
        const items = await Items.find({})
        res.send(items)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/items/:id',async(req,res)=>{


    try {
        const item = await Items.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true })

        if (!item) {
            return res.status(404).send()
        }
        await item.save()
        res.send(item)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router