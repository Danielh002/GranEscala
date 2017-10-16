'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')

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
    setNotLike
}