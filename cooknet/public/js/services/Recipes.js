app.service('RecipesService',function($http){
    this.getRecipesByUser=function(data,success,error){
        $http.get('./api/recipe/byUser/'+data).then(success).catch(error);
    }

});