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

//Permitindo que a aplicação leia JSON
app.use(express.json())


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

//Fazendo o registro do usuário

const ObjetoModel = require('./models/Objeto_model')

app.post('/autenticar/registrar',async(req,res)=>{
    let {nome,email,senha,confirmarSenha} = req.body

    if(!nome) {
        return res.status(422).json({msg:"O nome é obrigratório"})
    }
    
    if(!email) {
        return res.status(422).json({msg:"O email é obrigratório"})
    }
    
    if(!senha) {
        return res.status(422).json({msg:"A senha é obrigratória"})
    }
    
    if(senha !== confirmarSenha) {
        return res.status(422).json({msg:"As senhas não correspondem"})
    }

    //Verificando se o email já foi utilizado

    const Verificar = await new ObjetoModel({
        email:email
    })

    if(Verificar) {
        return res.status(422).json({msg:"Email já utilizado, use outro!"})
    }

    //Criando a senha

    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha,salt)

    //Criar usuário

    const ObjetoModelUser = new ObjetoModel({
        nome,
        email,
        senha:senhaHash
    })

    try{
         await ObjetoModelUser.save()
         res.json({msg:"Usuário salvo"})
    } catch {
        console.log('Ocorreu um erro' + erro)
        res.status(404).json({msg:"Ocorreu um erro"})
    }
       
})