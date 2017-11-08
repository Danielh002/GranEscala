app.controller('InviteController', [ '$rootScope','$scope','$location','$localStorage','InviteService', function( $rootScope,$scope,$location,$localStorage,InviteService) {
    $scope.inviteUser=function(){
        InviteService.inviteUser({email:$scope.emailInvite},function(res){
            console.log(res)
        },function(err){
            console.log(err)
        })
    }

}]);