'use strict'

const express=require('express')
const like=express.Router()
const likeCtrl=require('./../controllers/like')
const auth=require('../middlewares/auth')

like.post('/:idRecipe',auth.isAuth,likeCtrl.setLike)
like.delete('/:idRecipe',auth.isAuth,likeCtrl.setNotLike)


module.exports=like
