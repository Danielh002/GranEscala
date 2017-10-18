'use strict'

const User=require('./../models/user')
const Recipe=require('./../models/recipe')

function trendings(req,res){
    Recipe.find({},"_id title description user dateCreates").sort({likes:-1}).limit(10)
    .then(recipes=>{
        res.send(recipes);
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipes"})
    })
}

function recipesFollowing(req,res){
    User.findOne({user:req.query.user})
    .then(user=>{
        Recipe.find({user:{ $in: user.follow}},"_id title description user dateCreates").sort({dateCreates:-1}).limit(10)
        .then(recipes=>{
            res.send(recipes)
        })
        .catch(err=>{
            res.status(500).send({message:"error to find recipes"})
        })
    })
    .catch(err=>{
        res.status(500).send({message:"error to find user"})
    })
}

module.exports={
    trendings,
    recipesFollowing
}