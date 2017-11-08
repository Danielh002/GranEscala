'use strict'

const Recipe=require('./../models/recipe')

function searchRecipe(req,res){
	var content = {
		byTittle : [],
		byCategory : [],
	};

	Recipe.find({title:new RegExp(req.params.search,'i')})
    .then(recipesByTittle=>{
    	console.log(recipesByTittle);
        content.byTittle.push(recipesByTittle)
    })
	Recipe.find({categories : req.params.search})
    .then(recipesByCategory=>{
    	console.log(recipesByCategory);
    	content.byCategory.push(recipesByCategory)
        res.send(content);
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipes"})
    })
}

module.exports={
    searchRecipe
}