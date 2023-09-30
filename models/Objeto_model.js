const mongoose = require('mongoose')

const ObjetoModel = mongoose.model('ObjetoModel', {
    nome:String,
    email:String,
    senha:String
})
module.exports = ObjetoModel