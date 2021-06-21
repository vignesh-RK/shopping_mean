const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/shoppingData', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
},(err,data)=>
{
    if(!err){
        console.log('connected')
    }
})
