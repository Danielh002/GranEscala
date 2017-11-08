app.controller('searchRecipe',['$scope',"$localStorage",'searchRecipeService',function($scope,$localStorage,searchRecipeService){
    
    $scope.searchRecipe=function(){
        console.log($scope.recipeSearchText);
        $scope.searched=true;
        if($scope.recipeSearchText!=""){
            searchRecipeService.searchRecipe($scope.recipeSearchText,function(res){
                $scope.responseSearch=res.data
                console.log($scope.responseSearch);
                console.log($scope.responseSearch.byTittle);
                console.log($scope.responseSearch.byCategory);
                if($scope.responseSearch.byTittle.length==0 && $scope.responseSearch.byCategory.length==0){
                    $scope.message="No hay resultados que coinsidan con \""+$scope.userSearchText+"\"";
                }
                else{
                    $scope.message=null;
                }
            },function(err){
                
            })
        }
        else{
            $scope.responseSearch=[];
        }
    }
    $scope.toMyRecipes=function(){
        window.location="#!dashboard/misRecetas"
    }
}])
