'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema

const RecipeSchema=new Schema({
    user:{type :String},
    title:{type:String},
    description:{type:String},
    ingredients:{type:String},
    preparation:{type:String},
    dateCreates:{type:Date,default: Date.now()},
    likes:[String]
})



module.exports=mongoose.model('Recipe',RecipeSchema)