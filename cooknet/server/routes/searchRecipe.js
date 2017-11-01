'use strcit'

const express=require('express')
const searchRecipe=express.Router()
const searchRecipeCtr=require('./../controllers/searchRecipe')

searchRecipe.get('/:search',searchRecipeCtr.searchRecipe)

module.exports=searchRecipe