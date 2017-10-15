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
    res.status(200).send({message:"remove follow"})
}

function getFollowingUsers(req,res){
    res.send([{user:"usuario",email:"user@email.com"}]);
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