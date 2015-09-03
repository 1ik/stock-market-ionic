angular.module('app.controllers',['ui.router'])
.controller('SplashController', ['$scope','$http', 'authService', '$ionicModal', '$state',function($scope, $http, authService, $ionicModal,$state){


	$scope.submitForm = function(email, password, signingUp){

		authService.authenticateUser(email,password).then(function(data){
			
			//login success
			$state.go("app.dashboard")
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