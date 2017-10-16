app.controller('Users',['$scope',"$localStorage",'UsersService',function($scope,$localStorage,UsersService){
    
    $scope.searchUser=function(){
        $scope.searched=true;
        if($scope.userSearchText!=""){
            UsersService.searchUser($scope.userSearchText,$localStorage.user,function(res){
                $scope.responseSearch=res.data;
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
    $scope.followUser=function(user){
        console.log(user)
        UsersService.followUser({user:user},function(){

        },function(err){

        })
        $scope.searchUser();
    }

    $scope.unFollowUser=function(user){
        console.log(user+" unfollow ")
        UsersService.unFollowUser(user,function(){

        },function(err){
            
        })
        $scope.searchUser();
    }
    $scope.searched=false;
}])
