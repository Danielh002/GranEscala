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
                $localStorage.user=res.data.user;
                $localStorage.isAdmin=res.data.isAdmin;
                window.location="#!dashboard";
                if(res.data.isAdmin){
                    window.location="#!dashboardAdmin";
                }
                console.log(res.data)
            }
            else if(res.status==401){
                console.log("usuario o contraseña incorrecta");
                $scope.message="usuario o contraseña incorrecta";
            }

        },function(res){
            if(res.status==401){
                $scope.message="usuario o contraseña incorrecta";
            }
            else{
                $scope.message="error en la conexion";
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
                  $localStorage.user=res.data.user;
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
        delete $localStorage.user;
        window.location="/";
    };

    $scope.existMessage=function(){
        if($scope.message){
            return true;
        }
        else{
            return false;
        }
    }
    $scope.verifyUser=function(){
        $scope.message=null;
        data={user:$scope.username};
        AuthService.userExist(data,function(res){
            if(res.status==200){
                if(res.data.userExist){
                    $scope.okUser=false;
                    $scope.message="el nombre de usuario ya existe intenete otro"
                }
                else{
                    $scope.okUser=true;
                }
            }
        })
    }
    $scope.verifyEmail=function(){
        $scope.message=null;
        if($scope.email){
            data={email:$scope.email};
            AuthService.emailExist(data,function(res){
                if(res.status==200){
                    if(res.data.emailExist){
                        $scope.okEmail=false;
                        $scope.message="el correo ya se encuentra registrado intente otro"
                    }
                    else{
                        $scope.okEmail=true;
                    }
                }
            })
        }
    }
    // $scope.token = $localStorage.token;
}]);