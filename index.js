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


//Pegando variavéis do .env

const DBuser = process.env.DB_USER
const DBpassword = process.env.DB_PASSWORD

//Conectando ao banco de dados

mongoose.
        connect(`mongodb+srv://RichardBreno:${DBpassword}@cluster0.rfkevo9.mongodb.net/?retryWrites=true&w=majority`)
        .then(()=>{
            app.listen(3000,()=>{
                console.log('Ouvindo porta 3000')
            })
            console.log('Conectou ao banco!')
        })
        .catch(erro=>{
            console.log('Deu erro' + erro)
        })