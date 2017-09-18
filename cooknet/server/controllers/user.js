'use strict'

const mongoose=require('mongoose')
const User=require('./../models/user')
const token=require('./../services/token')


function signUp(req,res){
    const user=new User({
        email:req.body.email,
        user:req.body.user,
        password:req.body.password
    })

    user.save((err)=>{
        if(err) return res.status(500).send({message:'error to create user'})
        return res.status(200).send({token:token.createToken(user)})
    })
}

function signIn(req,res){
    User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'user dont exist'})
        console.log(user)
        req.user=user
        res.status(200).send({
            message:'authenticated',
            token:token.createToken(user)
        })
    })
}


module.exports={
    signUp,
    signIn
}