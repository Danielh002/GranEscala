app.service('AuthService',function($http){
    this.signIn=function(data,success,error){
        $http.post('./api/signIn', data).then(success).catch(error);
    }
    this.signUp=function(data,success,error){
        $http.post('./api/signUp',data).then(success).catch(error);
    }
    this.userExist=function(data,succes,error){
        $http.post('./api/userExist',data).then(succes).catch(error);
    }
    this.emailExist=function(data,succes,error){
        $http.post('./api/emailExist',data).then(succes).catch(error);
    }

});