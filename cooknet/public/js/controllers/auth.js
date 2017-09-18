app.controller('AuthController', [ '$rootScope','$scope','$location','$localStorage','AuthService', function( $rootScope,$scope,$location,$localStorage,AuthService) {

    $scope.login = function() {
        $scope.message=null;
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
                $scope.message="usuario o contraseña incorrecta";
            }

        },function(res){

            if(res.data && res.data.message=="user dont exist"){
                console.log("usuario o contraseña incorrecta");
                $scope.message="usuario o contraseña incorrecta";
            }
        });
    };

    $scope.signUp = function() {
        $scope.message=null;
        if($scope.password==$scope.passwordConfirm){
            
            data={
                email:$scope.email,
                password:$scope.password,
                user:$scope.username
            }
            AuthService.signUp(data,function(res){
              if(res.status==200){
                  $localStorage.token=res.data.token;
                  $token=$localStorage.token;
                  window.location="/";
              }
            },function(res){
              if(res.data && res.data.message=="user dont exist"){
                  $scope.message="usuario o contraseña incorrecta";
              }
            });
            console.log(data);
        }
        else{
            $scope.message="las contraseña no son iguales"
        }

    };

    $scope.me = function() {
        
    };

    $scope.logout = function() {
        $scope.token=null;
        delete $localStorage.token;
    };

    $scope.existMessage=function(){
        console.log("vmd")
        if($scope.message){
            return true;
        }
        else{
            return false;
        }
    }
    // $scope.token = $localStorage.token;
}]);