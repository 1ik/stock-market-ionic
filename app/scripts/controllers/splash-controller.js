angular.module('app.controllers')
.controller('SplashController', ['$scope','$http', 'authService', '$ionicModal', function($scope, $http, authService, $ionicModal){


	$scope.submitForm = function(email, password, signingUp){

		authService.authenticateUser(email,password).then(function(data){
			
			//login success
			console.log(data);
		}).catch(function(data){
			
			$ionicModal.fromTemplateUrl('templates/modals/login-failed.html', {
		    	scope: $scope,
		    	animation: 'slide-in-up'
		  	}).then(function(modal) {
		    	$scope.modal = modal;
		    	$scope.modal.show();
		  	});
			//login failed
			console.log(data);
		});

	}
}]);