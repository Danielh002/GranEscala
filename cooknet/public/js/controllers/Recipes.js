app.controller('RecipesController', [ '$rootScope','$scope','$location','$localStorage','RecipesService', function( $rootScope,$scope,$location,$localStorage,RecipesService) {
    
       $scope.recipes=[];
    $scope.editRecipe=function(recipe){
        console.log(recipe);
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
    $scope.setRecipes();

    $scope.createRecipe=function(){
        data={title:$scope.title,description:$scope.description,ingredients:$scope.ingredients,preparation:$scope.preparation}
        console.log(data);
        RecipesService.createRecipe(data,function(res){
            if(res.status==200){

            }
            window.location="#!dashboard/misRecetas";
        },function(err){

        })
    }
    }]);