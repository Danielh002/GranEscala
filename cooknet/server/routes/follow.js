'use strict'

const express=require('express')
const follow=express.Router()
const followCtrl=require('./../controllers/follow')
const auth=require('../middlewares/auth')

follow.post('/',auth.isAuth,followCtrl.followUser)
follow.get('/',auth.isAuth,followCtrl.getFollowingUsers)
follow.delete('/:id',auth.isAuth,followCtrl.removeFollow)
follow.get('/search',followCtrl.searchUsers)


module.exports=follow
