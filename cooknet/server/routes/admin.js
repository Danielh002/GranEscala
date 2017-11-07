'use strict'

const express=require('express')
const admin=express.Router()
const adminCtr=require('./../controllers/admin')
const auth=require('../middlewares/auth')

admin.delete('/recipe/:id',auth.isAuth,adminCtr.deleteRecipe)

module.exports=admin
