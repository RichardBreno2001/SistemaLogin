const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Open route
app.get('/',(req,res)=>{
    res.send('testando rota principal')
})


app.listen(3000,()=>{
    console.log('Ouvindo porta 3000')
})