app.service('DashboardAdminService',["$localStorage","$http",function($localStorage,$http){
    this.searchRecipe=function(text,success,error){
        $http.get('./api/searchRecipe/'+text).then(success).catch(error);
    }

    this.deleteRecipe=function(id,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.delete('./api/admin/recipe/'+id).then(success).catch(error);
    }
    

}]);