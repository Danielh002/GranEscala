'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')

function isLike(req,res){
    Recipe.findById(req.params.idRecipe)
    .then(recipe=>{
        if(recipe){
            if(recipe.likes.indexOf(req.query.user)>=0){
                res.send({like:true})
            }
            else{
                res.send({like:false})
            }
        }
        else{
            res.status(404).send({message:"the recipe dont exist"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipe"})
    })
}

function setLike(req,res){
    Recipe.update({_id:req.params.idRecipe},{$push:{likes:req.user}})
    .then(user=>{
        if(user){
            res.status(200).send({message:"like recipe"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to set like to recipe"})
    })
   
}

function setNotLike(req,res){
    Recipe.update({_id:req.params.idRecipe},{$pull:{likes:req.user}})
    .then(user=>{
        res.send({message:"not like recipe"})
    })  
    .catch(err=>{
        res.status(500).send({message:"error to set not like to recipe"})
    })
}




module.exports={
    setLike,
    setNotLike,
    isLike
}