'use strict'
const User=require('./../models/user')


function getUser(req,res){
    let user=new User()
    user.findById(req.params.id)
    res.json({message:'lol'})
}
function registerUser(req,res){
    let user=new User()
    user.email=req.body.email
    user.save((err,userStored)=>{
        if(err) {            
            if(err.errors.email) res.status(500).send({message:"email already exist"})
            else res.status(500).res.json({message:"Error at momento to save user"})
        }
        else{
            res.status(200).send({user:userStored})
        }
    })
    
}
function emailExist(email,callback){
    User.find({email:email},function(err,user){
        if(err) throw err
        else if(user) return false
        else return true
    })
}

module.exports={
    getUser,
    registerUser
}