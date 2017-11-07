app.controller('RecipesViewRecipesController', [ '$rootScope','$scope','$location','$localStorage','RecipesService', function( $rootScope,$scope,$location,$localStorage,RecipesService) {
    
    $scope.recipes=[];
    $scope.editRecipe=function(recipe){
        window.location="#!dashboard/EditarReceta/"+recipe;
    }
    $scope.deleteRecipe=function(id){
        RecipesService.deleteRecipe(id,function(res){
            if(res.status==200){
                $scope.setRecipes();
            }
        },function(err){

        })
    }
    $scope.setRecipes=function(){
        RecipesService.getRecipesByUser($localStorage.user,function(res){
            if(res.status==200){
                $scope.recipes=res.data;
            }
        },function(err){
    
        })
    }
    

    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
    
    $scope.setRecipes();
    }]);

app.controller('RecipesCreateController',['$scope','RecipesService',function($scope,RecipesService){
    $scope.categories = ["Comidas Exoticas","Comidas rápidas","Carnes","Ensaladas","Pasta","Purés","Tortillas"];
    $scope.selection = [];
    
    // Toggle selection for a given category by name
    $scope.toggleSelection = function toggleSelection(categorieName) {
        var idx = $scope.selection.indexOf(categorieName);
    // Is currently selected
    if (idx > -1) {
        $scope.selection.splice(idx, 1);
    }
    // Is newly selected
    else {
        $scope.selection.push(categorieName);
    }
    };

    $scope.createRecipe=function(){
        $scope.message=null;
        if($scope.title!=undefined && $scope.description!=undefined && $scope.ingredients!=undefined && $scope.preparation!=undefined && $scope.selection.length > 0){
            data={title:$scope.title,description:$scope.description,ingredients:$scope.ingredients,preparation:$scope.preparation,categories:$scope.selection}
            RecipesService.createRecipe(data,function(res){
                if(res.status==200){
                    
                }
                $scope.toMyRecipes();
            },function(err){
              $scope.message="error al intentar crear la receta";  
            })
        }
        else{
            $scope.message="Por favor llene todos los campos";
        }
    }
    $scope.message=null;
    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
}])

app.controller('RecipesEditController', [ '$rootScope','$scope','$location','$localStorage','RecipesService','$routeParams', function( $rootScope,$scope,$location,$localStorage,RecipesService,$routeParams) {
    $scope.categories = ["Comidas Exoticas","Comidas rápidas","Carnes","Ensaladas","Pasta","Purés","Tortillas"];
    $scope.selection = [];
    $scope.message=null;

    $scope.toggleSelection = function toggleSelection(categorieName) {
        var idx = $scope.selection.indexOf(categorieName);

    // Is currently selected
    if (idx > -1) {
        $scope.selection.splice(idx, 1);
    }

    // Is newly selected
    else {
        $scope.selection.push(categorieName);
    }
    };

    $scope.updateRecipe=function(){
        $scope.message=null;
        if($scope.title!="" && $scope.description!="" && $scope.ingredients!="" && $scope.preparation!="" && $scope.selection.length > 0 ){
            data={title:$scope.title,description:$scope.description,ingredients:$scope.ingredients,preparation:$scope.preparation,categories:$scope.selection}
            RecipesService.updateRecipe($routeParams.id,data,function(res){
                if(res.status==200){
                    
                }
                $scope.toMyRecipes();
            },function(err){
                $scope.message="erro al intentar actualizar la receta"; 
            })
        }
        else{
            $scope.message="Por favor llene todos los campos";
        }
    }
    
    $scope.getRecipe=function(){
        RecipesService.getRecipeById($routeParams.id,function(res){
            $scope.title=res.data.title;
            $scope.description=res.data.description;
            $scope.ingredients=res.data.ingredients;
            $scope.preparation=res.data.preparation;
            $scope.comments= res.data.comments;
            console.log(res);
        },function(err){

        })
    }

    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
    
    

    $scope.getRecipe(); 
    }]);
app.controller('RecipesViewController',['$scope','$routeParams','$localStorage','RecipesService',function($scope,$routeParams,$localStorage,RecipesService){
    $scope.categoriesClass=["label label-warning","label label-info","label label-success"];
    $scope.categories = [];

    $scope.getRecipe=function(){
        RecipesService.getRecipeById($routeParams.id,function(res){
            $scope.title=res.data.title;
            $scope.user=res.data.user;
            $scope.description=res.data.description;
            $scope.ingredients=res.data.ingredients;
            $scope.preparation=res.data.preparation;
            $scope.comments= res.data.comments;
            console.log(res.data.categories)
            for(var i=0; i< res.data.categories.length; i++){
                var rand = $scope.categoriesClass[Math.floor(Math.random() * $scope.categoriesClass.length)];
                var pair = {class: rand, category: res.data.categories[i] };
                $scope.categories.push(pair);
                pair = [];
            }
            console.log($scope.categories);
            console.log(res);
        },function(err){

        })
    }
    $scope.setLike=function(){
        RecipesService.setLike($routeParams.id,function(res){

        },function(err){

        })
        $scope.like=true;
    }
    $scope.setNotLike=function(){
        RecipesService.setNotLike($routeParams.id,function(res){

        },function(err){
            
        })
        $scope.like=false;
    }

    $scope.getLike=function(){
        RecipesService.getLike($routeParams.id,$localStorage.user,function(res){
            $scope.like=res.data.like;
        },function(err){
        })
    }

    $scope.addComment=function(){
        data={content:$scope.content}
        RecipesService.addComment($routeParams.id,data,function(res){
            $scope.getRecipe();
        },function(err){
        })
    }

    $scope.like=false;
    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
    $scope.getRecipe();
    $scope.getLike();
}])