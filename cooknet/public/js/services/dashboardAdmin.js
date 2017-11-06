app.service('DashboardAdminService',["$localStorage","$http",function($localStorage,$http){
    this.searchRecipe=function(text,success,error){
        $http.get('./api/searchRecipe/'+text).then(success).catch(error);
    }


    //falta definir header de authorization

}]);