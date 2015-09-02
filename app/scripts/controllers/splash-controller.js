angular.module('app.controllers')
.controller('SplashController', ['$scope','$http', 'authService', function($scope, $http, authService){


	$scope.submitForm = function(email, password, signingUp){

		authService.authenticateUser(email,password).then(function(data){
			
			//login success
			console.log(data);
		}).catch(function(data){
			
			//login failed
			console.log(data);
		});

	}
}]);