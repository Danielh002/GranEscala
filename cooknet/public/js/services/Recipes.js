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

    this.setLike=function(id,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.post('./api/like/'+id).then(success).catch(error);
    }

    this.setNotLike=function(id,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.delete('./api/like/'+id).then(success).catch(error);
    }

    this.getLike=function(id,user,success,error){
        //$http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.get('./api/like/'+id+"?user="+user).then(success).catch(error);
    }

    this.addComment=function(id,success,error){
        $http.defaults.headers.common['Authorization']="Bearer "+$localStorage.token;
        $http.post('./api/comment/'+id).then(success).catch(error);
    }

    //falta definir header de authorization

}]);