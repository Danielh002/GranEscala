'use strict'

const Recipe=require('./../models/recipe')

function searchRecipe(req,res){
    Recipe.find({title:new RegExp(req.params.search,'i')})
    .then(recipes=>{
        res.send(recipes);
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipes"})
    })
}

module.exports={
    searchRecipe
}