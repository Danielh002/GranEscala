app.service('RecipesService',["$localStorage","$http",function($localStorage,$http){
    this.getRecipesByUser=function(data,success,error){
        $http.get('./api/recipe/byUser/'+data).then(success).catch(error);
    }
    this.getRecipeById=function(id,succes,error){
        $http.get('./api/recipe/'+id).then(succes).catch(error);
    }
    this.createRecipe=function(data,succes,error){
        $http.post('./api/recipe',data).then(success).catch(error);
    }
    this.updateRecipe=function(id,data,succes,error){
        $http.put('./api/recipe/'+id,data).then(succes).catch(error);
    }
    this.deleteRecipe=function(id,succes,error){
        $http.defaults.headers.common['Authorization']="baer "+$localStorage.token;
        $http.delete('./api/recipe/'+id).then(succes).catch(error);
    }

    //falta definir header de authorization

}]);