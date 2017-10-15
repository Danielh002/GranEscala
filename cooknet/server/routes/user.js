'use strict'

const express=require('express')
const user=express.Router()
const userCtrl=require('./../controllers/user')
const auth=require('../middlewares/auth')

user.get('/',auth.isAuth,userCtrl.getUsers)
user.get('/:user',userCtrl.getUser)
user.post('/',userCtrl.updateUser)

module.exports=user
