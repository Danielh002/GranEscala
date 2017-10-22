'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')

function addComment(req,res){
    console.log("aqui")
    Recipe.update({_id:req.params.idRecipe},{$push:{comments:{user : req.user, content : req.body.content}}})
    .then(user=>{
        if(user){
            res.status(200).send({message:"Add Comment"})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send({message:"Error to Add Comment"})
    })
   
}

module.exports={
    addComment
}

