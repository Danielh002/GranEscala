'use strict'

const express=require('express')
const user=express.Router()
const userCtrl=require('./../controllers/user')

user.get('/:user',userCtrl.getUser)
user.post('/',userCtrl.updateUser)

module.exports=user
