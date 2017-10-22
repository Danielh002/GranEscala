'use strict'

const express=require('express')
const comment=express.Router()
const commentCtrl=require('./../controllers/comment')
const auth=require('../middlewares/auth')

comment.post('/:idRecipe',auth.isAuth,commentCtrl.addComment)

module.exports=comment
