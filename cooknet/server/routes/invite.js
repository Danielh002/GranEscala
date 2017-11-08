'use strcit'

const express=require('express')
const invite=express.Router()
const auth=require('./../middlewares/auth')
const inviteCtr=require('./../controllers/invite')

invite.post('/',auth.isAuth,inviteCtr.inviteUser)

module.exports=invite