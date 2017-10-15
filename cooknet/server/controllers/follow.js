'use strict'

const mongoose=require('mongoose')
const User=require('./../models/user')

function followUser(req,res){
    User.update({user:req.user},{$push:{follow:req.body.user}})
    .then(user=>{
        if(user){
            res.status(200).send({message:"following user"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to follow user"})
    })
   
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