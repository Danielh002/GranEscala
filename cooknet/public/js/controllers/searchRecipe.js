app.controller('searchRecipe',['$scope',"$localStorage",'searchRecipeService',function($scope,$localStorage,searchRecipeService){
    $scope.responseSearch={};
    $scope.responseSearch.byTittle=[];
    $scope.responseSearch.byCategory=[];
    
    $scope.searchRecipe=function(){
        console.log($scope.recipeSearchText);
        $scope.searched=true;
        if($scope.recipeSearchText!=""){
            searchRecipeService.searchRecipe($scope.recipeSearchText,function(res){
                $scope.responseSearch=res.data
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
    $scope.responseSearch={};
    $scope.responseSearch.byTittle=[];
    $scope.responseSearch.byCategory=[];
}])
