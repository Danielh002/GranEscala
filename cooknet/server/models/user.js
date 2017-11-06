'use strict'

const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserSchema=new Schema({
    email:{type :String, unique:true,lowercase:true},
    user:{type:String,unique:true,lowercase:true},
    password:{type:String,select:false},
    signupDate:{type:Date,default: Date.now()},
    lastLogin:Date,
    follow:[String],
    isAdmin:{type:Boolean,default:false}
})

UserSchema.pre('save',(next)=>{
    let self=this
    next()
    //if(!user.isModified('password')) return next()
})

UserSchema.path('email').validate(function(value,done){
    //function to return message of email already esxist
    this.model('User').count({email:value},function(err,count){
        if(err){
            return done(err);
        }
        done(!count)
    })
},'Email must be unique')

module.exports=mongoose.model('User',UserSchema)