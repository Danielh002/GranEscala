'use strict'

const mongoose=require('mongoose')
const Recipe=require('./../models/recipe')
const multer=require('multer')

function createRecipe(req,res){
    console.log(req.body)
    if(req.body.title!=undefined && req.body.description!=undefined && req.body.ingredients!=undefined && req.body.preparation!=undefined && req.body.categories!=undefined){

        const recipe=new Recipe({
            user:req.user,
            title:req.body.title,
            description:req.body.description,
            ingredients:req.body.ingredients,
            preparation:req.body.preparation,
            categories:req.body.categories
        })
    
        recipe.save()
        .then(function(response){
            res.status(200).send({message:"recipe was created",id:response._id})
        })
        .catch(function (err){
            return res.status(500).send({message:"error to create recipe"})
        })
    }
    else{
        res.status(500).send({message:"cannot create a recipe without information"})
    }
}

function getRecipeById(req,res){
    Recipe.findById(req.params.id)
    .then(function(recipe){
        if(recipe){
            res.send(recipe)
        }
        else{
            res.status(404).send({message:"recipe dont exist"})
        }
    })
    .catch(function(err){
        res.status(500).send({message:"error to find recipe"})
    })
}

function deleteRecipe(req,res){
    Recipe.findById(req.params.id)
    .then(recipe=>{
        if(recipe){
            if(recipe.user==req.user){
                Recipe.findByIdAndRemove(req.params.id)
                .then(()=>{
                    res.send({message:"recipe was deleted"})
                })
                .catch(err=>{
                    res.status(500).send({message:"error to delete recipe"})
                })
            }
            else{
                res.status(401).send({message:"no authorized"})
            }
        }
        else{
            res.status(404).send({message:"recipe dont exist"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipe"})
    })
}

function updateRecipe(req,res){
    Recipe.findById(req.params.id)
    .then(function(recipe){
        if(recipe){
            if(recipe.user==req.user){
                Recipe.findByIdAndUpdate(req.params.id,req.body)
                .then(function(){
                    res.send({message:"recipe was updated"})
                })
                .catch(function(err){
                    res.status(500).send({message:"error to update recipe"})
                })
            }   
            else{
                res.status(401).send({message:"no authorized"})
            }
        }
        else{
            res.status(404).send({message:"recipe dont exist"})
        }
    })
    .catch(function(err){
        res.status(500).send({message:"error to find recipe"})
    })
}

function getRecipesByUser(req,res){
    Recipe.find({user:req.params.user}).select('title description likes')
    .then((recipes)=>{
        if(recipes){
            res.send(recipes)
        }
        else{
            res.status(404).send({message:"the user dont have recipes"})
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error to find recipes"})
    })
}

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './../public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log("estoy aqui")
        var nameFile=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
        cb(null, nameFile)
        req.nameFile=nameFile
    }
});
var upload = multer({ //multer settings
                storage: storage
            }).single('file');
/** API path that will upload the files */

function uploadImageRecipe(req,res){
    console.log("entro")
    upload(req,res,function(err){
        console.log("jfcbd")
        if(err){
            console.log(err)
            res.json({error_code:1,err_desc:err});
            return;
        }
        Recipe.findById(req.body.id)
        .then(function(recipe){
            if(recipe){
                console.log("-->    ")
                console.log(recipe)
                recipe.imageSrc="./uploads/"+req.nameFile;
                console.log(recipe)
                    Recipe.findByIdAndUpdate(req.body.id,recipe)
                    .then(function(){
                        // res.send({message:"recipe was updated"})
                    })
                    .catch(function(err){
                        // res.status(500).send({message:"error to update recipe"})
                    })
            }
            else{
                // res.status(404).send({message:"recipe dont exist"})
            }
        })
        .catch(function(err){
            // res.status(500).send({message:"error to find recipe"})
        })
        console.log(req.nameFile)
        res.json({error_code:0,err_desc:null});
    })
}

module.exports={
    createRecipe,
    getRecipeById,
    deleteRecipe,
    updateRecipe,
    getRecipesByUser,
    uploadImageRecipe
}