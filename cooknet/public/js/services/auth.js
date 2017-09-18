app.service('AuthService',function($http){
    this.signIn=function(data,success,error){
        $http.post('./api/signIn', data).then(success).catch(error);
    }
    this.signUp=function(data,success,error){
        $http.post('./api/signUp',data).then(success).catch(error);
    }
});