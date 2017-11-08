'use strict'

const express=require('express')
const recipe=express.Router()
const recipeCtrl=require('./../controllers/recipe')
const auth=require('../middlewares/auth')

recipe.post('/',auth.isAuth,recipeCtrl.createRecipe)
recipe.get('/:id',recipeCtrl.getRecipeById)
recipe.put('/:id',auth.isAuth,recipeCtrl.updateRecipe)
recipe.delete('/:id',auth.isAuth,recipeCtrl.deleteRecipe)
recipe.get('/byUser/:user',recipeCtrl.getRecipesByUser)
recipe.post('/image',recipeCtrl.uploadImageRecipe)

module.exports=recipe
