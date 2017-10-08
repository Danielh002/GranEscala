'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')

function followUser(req,res){
    

    res.status(200).send({message:"following user"})
   
}

function removeFollow(req,res){
    res.status(200).send({message:"remove follow"})
}

function getFollowingUsers(req,res){
    res.send([{user:"usuario",email:"user@email.com"}]);
}

module.exports={
    followUser,
    removeFollow,
    getFollowingUsers,
}