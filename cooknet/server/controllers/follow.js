'use strict'

const mongoose=require('mongoose')
const User=require('./../models/user')
const usersManipulation=require('./../services/usersManipulation')

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
    User.update({user:req.user},{$pull:{follow:req.params.id}})
    .then(user=>{
        res.send({message:"user unfollow"})
    })  
    .catch(err=>{
        res.status(500).send({message:"error to unfollow user"})
    })
}

function getFollowingUsers(req,res){
    User.findOne({user:req.query.user})
    .then(user=>{
        if(user.follow){
            res.send({usersFollowing:user.follow})
        }
        else{
            res.send({usersFollowing:[]})
        }
        
    })
    .catch(err=>{
        res.status(500).send({message:"error to find user"})
    })
}

function searchUsers(req,res){
    User.find({user:new RegExp(req.query.userSearch, 'i')})
    .then(users=>{
        User.findOne({user:req.query.user})
        .then(user=>{

            res.send(usersManipulation.usersFollowingOrNot(users.map(user=>{return user.user}).sort(),user.follow.sort(),req.query.user));
        })
        .catch(err=>{
            res.status(500).send({message:"error to find user"})
        })
    })
    .catch(err=>{
        res.status(500).send({message:"error to find users"})
    })
}

module.exports={
    followUser,
    removeFollow,
    getFollowingUsers,
    searchUsers
}