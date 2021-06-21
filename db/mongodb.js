const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://shoppingapp:vicky123@cluster0.lf6r8.mongodb.net/shopping-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
},(err,data)=>
{
    if(!err){
        console.log('connected')
    }
})
