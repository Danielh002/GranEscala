'use strict'

const express = require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const api=require('./routes/api')

const port=process.env.PORT || 8080
let app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('./../public'))

app.get('/',(req,res)=>{
    res.send('Hola mundo')
})

app.use('/api',api)
app.use((req,res)=>{
    res.sendFile('public/index.html',{root:'../'})
})


mongoose.connect('mongodb://localhost:27017/cooknet',function(err){
    
    if (err) {
        return console.log(`error to connect to DataBase  ${err}`)
    }
    console.log('connect to DataBase')
    app.listen(port,()=>{
        console.log(`server running on port: ${port}`)
    })
})
