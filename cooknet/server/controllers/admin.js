'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')
const User=require('./../models/user')
function deleteRecipe(req,res){
    User.findOne({user:req.user})
        .then(user=>{
            if(user){
                if(user.isAdmin){
                    Recipe.findByIdAndRemove(req.params.id)
                    .then(()=>{
                        res.send({message:"recipe was deleted"})
                    })
                    .catch(err=>{
                        res.status(500).send({message:"error to delete recipe"})
                    })
                }
                else{
                    res.status(401).send({message:"no authorized"})
                }
            }
            else{
                res.status(404).send({message:"recipe dont exist"})
            }
        })
        .catch(err=>{
            res.status(500).send({message:"error to find recipe"})
        })
}

module.exports={
    deleteRecipe
}