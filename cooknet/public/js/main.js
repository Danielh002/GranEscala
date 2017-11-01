// Creación del módulo
var app = angular.module('myApp', ['ngRoute','ngStorage']);

// Configuración de las rutas
app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'pages/home.html',
			controller 	: 'mainController'
		})
		.when('/acerca', {
			templateUrl : 'pages/acerca.html',
			controller 	: 'aboutController'
		})
		.when('/contacto', {
			templateUrl : 'pages/contacto.html',
			controller 	: 'contactController'
		})
		.when('/login',{
			templateUrl:'pages/login.html',
			controller: 'AuthController'
		})
		.when('/signUp',{
			templateUrl:'pages/signUp.html',
			controller:'AuthController'
		})
		.when('/dashboard',{
			templateUrl:'pages/dashboard.html',
			controller: 'DashboardController'
		})
		.when('/dashboard/misRecetas',{
			templateUrl:'pages/misRecetas.html',
			controller: 'RecipesViewRecipesController'
		})
		.when('/dashboard/crearReceta',{
			templateUrl:'pages/createRecipe.html',
			controller:'RecipesCreateController'
		})
		.when('/dashboard/EditarReceta/:id',{
			templateUrl:'pages/editRecipe.html',
			controller:'RecipesEditController'
		})
		.when('/dashboard/receta/:id',{
			templateUrl:'pages/recipeView.html',
			controller:'RecipesViewController'
		})
		.when('/dashboard/usuarios',{
			templateUrl:'pages/usuarios.html',
			controller:'Users'
		})
		.when('/dashboard/recetas',{
			templateUrl:'pages/recetas.html',
			controller:'searchRecipe'
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.controller('mainController', ['$scope','$localStorage',function($scope,$localStorage) {
	$scope.existToken=function(){
		if($localStorage.token){
			return true;
		}
		else{
			return false;
		}
	}
	$scope.logout = function() {
        $scope.token=null;
		delete $localStorage.token;
		delete $localStorage.user;
        window.location="/";
    };
	if($scope.existToken()){
		window.location="#!dashboard";
	}
}]);

app.controller('aboutController', function($scope) {
	$scope.message = 'Esta es la página "Acerca de"';
});

app.controller('contactController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});
