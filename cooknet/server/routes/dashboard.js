'use strict' 

const express=require('express')
const dashboard=express.Router()
const dashboardCtrl=require('./../controllers/dashboard')

dashboard.get('/trendings',dashboardCtrl.trendings)
dashboard.get('/recipesFollowing',dashboardCtrl.recipesFollowing)

module.exports=dashboard