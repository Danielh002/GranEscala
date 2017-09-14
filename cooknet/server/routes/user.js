'use strict'

const express=require('express')
const user=express.Router()
const userCtrl=require('./../controllers/user')

user.get('/',userCtrl.getUser)
user.post('/',userCtrl.registerUser)

module.exports=user
