app.service('InviteService',["$localStorage","$http",function($localStorage,$http){
    this.inviteUser=function(data,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.post('./api/invite',data).then(success).catch(error);
    }

}]);