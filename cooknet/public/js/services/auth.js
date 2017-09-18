app.service('AuthService',function($http){
    this.signIn=function(data,success,error){
        $http.post('./api/signIn', data).then(success).catch(error);
        
    }
});