app.controller('DashboardAdminController',['$scope',"$localStorage",'DashboardAdminService',function($scope,$localStorage,DashboardAdminService){
    
    $scope.searchRecipe=function(){
        console.log($scope.recipeSearchText);
        $scope.searched=true;
        if($scope.recipeSearchText!=""){
            DashboardAdminService.searchRecipe($scope.recipeSearchText,function(res){
                $scope.responseSearch=res.data;
                console.log(res.data);
                if($scope.responseSearch.length==0){
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
    $scope.deleteRecipe=function(id){
        DashboardAdminService.deleteRecipe(id,function(res){
            if(res.status==200){
                $scope.searchRecipe();
            }
        },function(err){

        })
    }
    
}])
