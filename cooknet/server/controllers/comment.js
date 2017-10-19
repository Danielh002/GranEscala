'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')

function addComment(req,res){
    Recipe.update({_id:req.params.idRecipe},{$push:{comments:req.user}})
    .then(user=>{
        if(user){
            res.status(200).send({message:"comment recipe"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to comment a recipe"})
    })
   
}


module.exports={
    addComment
}