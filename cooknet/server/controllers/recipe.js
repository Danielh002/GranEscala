'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')

function createRecipe(req,res){
    console.log(req.body)
    if(req.body.title!=undefined && req.body.description!=undefined && req.body.ingredients!=undefined && req.body.preparation!=undefined){

        const recipe=new Recipe({
            user:req.user,
            title:req.body.title,
            description:req.body.description,
            ingredients:req.body.ingredients,
            preparation:req.body.preparation
        })
    
        recipe.save()
        .then(function(){
            res.status(200).send({message:"recipe was created"})
        })
        .catch(function (err){
            return res.status(500).send({message:"error to create recipe"})
        })
    }
    else{
        res.status(500).send({message:"cannot create a recipe without information"})
    }
}

function getRecipeById(req,res){
    Recipe.findById(req.params.id)
    .then(function(recipe){
        if(recipe){
            res.send(recipe)
        }
        else{
            res.status(404).send({message:"recipe dont exist"})
        }
    })
    .catch(function(err){
        res.status(500).send({message:"error to find recipe"})
    })
}

function deleteRecipe(req,res){
    Recipe.findById(req.params.id)
    .then(recipe=>{
        if(recipe){
            if(recipe.user==req.user){
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

function updateRecipe(req,res){
    Recipe.findById(req.params.id)
    .then(function(recipe){
        if(recipe){
            if(recipe.user==req.user){
                Recipe.findByIdAndUpdate(req.params.id,req.body)
                .then(function(){
                    res.send({message:"recipe was updated"})
                })
                .catch(function(err){
                    res.status(500).send({message:"error to update recipe"})
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
    .catch(function(err){
        res.status(500).send({message:"error to find recipe"})
    })
}

function getRecipesByUser(req,res){
    Recipe.find({user:req.params.user}).select('title description')
    .then((recipes)=>{
        if(recipes){
            res.send(recipes)
        }
        else{
            res.status(404).send({message:"the user dont have recipes"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipes"})
    })
}

module.exports={
    createRecipe,
    getRecipeById,
    deleteRecipe,
    updateRecipe,
    getRecipesByUser
}