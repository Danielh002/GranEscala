app.service('UsersService',["$localStorage","$http",function($localStorage,$http){
    this.searchUser=function(text,user,success,error){
        $http.get('./api/follow/search?user='+user+"&userSearch="+text).then(success).catch(error);
    }
    

    //falta definir header de authorization

}]);