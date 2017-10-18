app.controller('UsersFollowController', [ '$rootScope','$scope','$location','$localStorage','UsersFollowService', function( $rootScope,$scope,$location,$localStorage,UsersFollowService) {
    $scope.users=[];
    UsersFollowService.getFollowingUsers($localStorage.user,function(res){
        $scope.users=res.data.usersFollowing;
        console.log($scope.users);
    },function(error){

    })
}]);