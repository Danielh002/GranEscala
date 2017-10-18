app.service('UsersFollowService',["$http",function($http){
  this.getFollowingUsers=function(user,success,error){
      $http.get('./api/follow/?user='+user).then(success).catch(error);
  }
  
}])