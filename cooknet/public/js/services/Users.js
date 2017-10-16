app.service('UsersService',["$localStorage","$http",function($localStorage,$http){
    this.searchUser=function(text,user,success,error){
        $http.get('./api/follow/search?user='+user+"&userSearch="+text).then(success).catch(error);
    }

    this.followUser=function(data,succes,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.post('./api/follow',data).then(succes).catch(error);
    }
    
    this.unFollowUser=function(user,succes,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.delete('./api/follow/'+user).then(succes).catch(error);
    }
    

    //falta definir header de authorization

}]);