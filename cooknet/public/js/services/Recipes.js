app.service('RecipesService',["$localStorage","$http",function($localStorage,$http){
    this.getRecipesByUser=function(data,success,error){
        $http.get('./api/recipe/byUser/'+data).then(success).catch(error);
    }
    this.getRecipeById=function(id,success,error){
        $http.get('./api/recipe/'+id).then(success).catch(error);
    }
    this.createRecipe=function(data,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.post('./api/recipe',data).then(success).catch(error);
    }
    this.updateRecipe=function(id,data,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.put('./api/recipe/'+id,data).then(success).catch(error);
    }
    this.deleteRecipe=function(id,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.delete('./api/recipe/'+id).then(success).catch(error);
    }

    //falta definir header de authorization

}]);