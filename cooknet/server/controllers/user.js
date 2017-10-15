'use strict'

const mongoose=require('mongoose')
const User=require('./../models/user')
const token=require('./../services/token')
const sha256=require('sha256')

function signUp(req,res){
    const user=new User({
        email:req.body.email,
        user:req.body.user,
        password:sha256(req.body.password)
    })

    user.save((err)=>{
        if(err) return res.status(500).send({message:'error to create user'})
        return res.status(200).send({token:token.createToken(user),user:req.body.user})
    })
}

function signIn(req,res){
    User.findOne({email:req.body.email,password:sha256(req.body.password)})
        .then(user=>{
            if(user){
                User.findOneAndUpdate({email:req.body.email},{$set:{lastLogin:Date.now()}},(err,user)=>{
                    if(err) return res.status(500).send({message: err})
                    if(!user) return res.status(401).send({message: 'user or password incorrect'})
                    req.user=user
                    res.status(200).send({
                        message:'authenticated',
                        token:token.createToken(user),
                        user:user.user
                    })
                })
            }
            else{
                if(!user) return res.status(401).send({message: 'user or password incorrect'})
            }
        })
        .catch(err=>{
            if(err){
                res.send(500).send({message:"error to find user"})
            }
        })
}

function userExist(req,res){
    if(!req.body.user){
        return res.status(400).send()
    }
    User.findOne({user:req.body.user},(err,user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(200).send({userExist:false})
        res.status(200).send({userExist:true})
    })
}

function emailExist(req,res){
    if(!req.body.email){
        return res.status(400).send()
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(200).send({emailExist:false})
        res.status(200).send({emailExist:true})
    })
}

function getUser(req,res){
    User.findOne({user:req.params.user})
    .then(user=>{
        if(user){
            res.send(user)
        }
        else{
            res.status(404).send({message:"user dont exist"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to find user"})
    })
}

function updateUser(req,res){
    res.send()
}

function getUsers(req,res){
    console.log(req.query.user)
    console.log(req.user)
    User.find({user:new RegExp(req.query.user, 'i')})
    .then(users=>{
        if(users){
            res.send(users.map(user=>{return {user:user.user,email:user.email,following:false} }))
        }
        else{
            res.status.send({message:"users dont exist"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to find users"})
    })
    // res.send([{user:"lenis96",email:"lenisandres5@gmail.com",following:false},{user:"usuario",email:"correo@gmail.com",following:true}])
}

module.exports={
    signUp,
    signIn,
    userExist,
    emailExist,
    getUser,
    updateUser,
    getUsers
}