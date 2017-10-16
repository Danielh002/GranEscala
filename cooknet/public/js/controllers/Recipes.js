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
    
    $scope.createRecipe=function(){
        data={title:$scope.title,description:$scope.description,ingredients:$scope.ingredients,preparation:$scope.preparation}
        RecipesService.createRecipe(data,function(res){
            if(res.status==200){
                
            }
            $scope.toMyRecipes();
        },function(err){
            
        })
    }
    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
}])

app.controller('RecipesEditController', [ '$rootScope','$scope','$location','$localStorage','RecipesService','$routeParams', function( $rootScope,$scope,$location,$localStorage,RecipesService,$routeParams) {
    
    $scope.updateRecipe=function(){
        data={title:$scope.title,description:$scope.description,ingredients:$scope.ingredients,preparation:$scope.preparation}
        RecipesService.updateRecipe($routeParams.id,data,function(res){
            if(res.status==200){
                
            }
            $scope.toMyRecipes();
        },function(err){
            
        })
    }
    
    $scope.getRecipe=function(){
        RecipesService.getRecipeById($routeParams.id,function(res){
            $scope.title=res.data.title;
            $scope.description=res.data.description;
            $scope.ingredients=res.data.ingredients;
            $scope.preparation=res.data.preparation;
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
    $scope.getRecipe=function(){
        RecipesService.getRecipeById($routeParams.id,function(res){
            $scope.title=res.data.title;
            $scope.user=res.data.user;
            $scope.description=res.data.description;
            $scope.ingredients=res.data.ingredients;
            $scope.preparation=res.data.preparation;
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

    $scope.like=false;
    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
    $scope.getRecipe();
    $scope.getLike();

}])