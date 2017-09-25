app.controller('RecipesController', [ '$rootScope','$scope','$location','$localStorage','RecipesService', function( $rootScope,$scope,$location,$localStorage,RecipesService) {
    
       $scope.recipes=[{title:"Pollo",description:"rico pollo chino",user:"lenis96"},{title:"Pollo",description:"rico pollo chino",user:"lenis96"},{title:"Pollo",description:"rico pollo chino",user:"lenis96"}];
    $scope.editRecipe=function(recipe){
        console.log(recipe);
    }
    RecipesService.getRecipesByUser($localStorage.user,function(res){
        if(res.status==200){
            $scope.recipes=res.data;
        }
    },function(err){

    })
    }]);