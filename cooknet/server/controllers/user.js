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
        return res.status(200).send({token:token.createToken(user)})
    })
}

function signIn(req,res){
    User.findOneAndUpdate({email:req.body.email,password:sha256(req.body.password)},{$set:{lastLogin:Date.now()}},(err,user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(401).send({message: 'use or password incorrect'})
        req.user=user
        res.status(200).send({
            message:'authenticated',
            token:token.createToken(user)
        })
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


module.exports={
    signUp,
    signIn,
    userExist,
    emailExist
}