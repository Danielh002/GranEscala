'use strict'

const express=require('express')
const api=express.Router()
const userCtrl=require('./../controllers/user')
const auth=require('../middlewares/auth')
const recipe=require('./recipe')
const user=require('./user')
const follow=require('./follow')
const like=require('./like')

api.post('/signIn',userCtrl.signIn)
api.post('/signUp',userCtrl.signUp)
api.post('/userExist',userCtrl.userExist)
api.post('/emailExist',userCtrl.emailExist)
api.get('/private',auth.isAuth,(req,res)=>{
    res.status(200).send({messages:"tienes acceso"})
})
api.use('/user',user)
api.use('/recipe',recipe)
api.use('/follow',follow)
api.use('/like/',like)

module.exports=api