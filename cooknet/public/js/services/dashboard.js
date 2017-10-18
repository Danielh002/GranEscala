app.service('DashboardService',["$http",function($http){
  this.getRecipesFollowing=function(user,success,error){
      $http.get('./api/dashboard/recipesFollowing?user='+user).then(success).catch(error);
  }
  this.getTrendings=function(success,error){
      $http.get('./api/dashboard/trendings').then(success).catch(error);
  } 
}])