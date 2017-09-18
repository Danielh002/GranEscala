app.controller('AuthController', [ '$rootScope','$scope','$location','$localStorage','AuthService', function( $rootScope,$scope,$location,$localStorage,AuthService) {

    $scope.login = function() {
        data={
            email:$scope.email,
            password:$scope.password
        }
       
        AuthService.signIn(data,function(res){
            console.log(res)
            if(res.status==200){
                $localStorage.token=res.data.token;
                $token=$localStorage.token;
                window.location="/";
            }
            else if(res.status==404){
                console.log("usuario o contraseña incorrecta");
            }

        },function(res){

            if(res.data && res.data.message=="user dont exist"){
                console.log("usuario o contraseña incorrecta");
            }
        });
    };

    $scope.signup = function() {
        
    };

    $scope.me = function() {
        
    };

    $scope.logout = function() {
        $scope.token=null;
        delete $localStorage.token;
    };
    // $scope.token = $localStorage.token;
}]);