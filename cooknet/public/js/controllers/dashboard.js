app.controller('DashboardController', [ '$rootScope','$scope','$location','$localStorage','DashboardService', function( $rootScope,$scope,$location,$localStorage,DashboardService) {
    $scope.trendings=[];
    $scope.recipesFollowing=[];
    DashboardService.getRecipesFollowing($localStorage.user,function(res){
        $scope.recipesFollowing=res.data;
        console.log($scope.recipesFollowing);
    },function(error){

    })
    DashboardService.getTrendings(function(res){
        $scope.trendings=res.data;
        console.log($scope.trendings);
    },function(error){

    })
}]);