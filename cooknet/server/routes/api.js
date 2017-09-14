'use strict'

const express=require('express')
const api=express.Router()
const userCtrl=require('./../controllers/user')
const auth=require('../middlewares/auth')

api.post('/signIn',userCtrl.signIn)
api.post('/signUp',userCtrl.signUp)
api.get('/private',auth.isAuth,(req,res)=>{
    res.status(200).send({messages:"tienes acceso"})
})

module.exports=api