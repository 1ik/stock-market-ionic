angular.module('app.controllers')
.controller('SplashController', ['$scope','$http', 'authService', '$ionicModal', '$ionicPopup', '$state','$localstorage','pushService', 
	function($scope, $http, authService, $ionicModal, $ionicPopup, $state, $localstorage, pushService){

	$scope.form = {
		email : 'rakimul@gmail.com',
		password: '123456'
	};

	$scope.submitForm = function(email, password, signingUp) {

		if(signingUp) {
			authService.registerUser($scope.form).then(function(data){			
				$ionicPopup.alert({
					title: 'Registration Successful',
					template: 'You have registered successfully. Please log in to continue.'
				}).then(function(res) {
					$scope.signingUp = false;
				});
			}).catch(function(data){
				
				$ionicPopup.alert({
					title: 'Registration Failed',
					template: 'The email address was incorrect or it already exists.'
				}).then(function(res) {
					$scope.signingUp = true;
				});

			});
			return false;
		}

		authService.authenticateUser(email,password).then(function(data) {
			pushService.register();			
		
			$localstorage.setObject('userData', { 
				token: data.token, 
				user: data.user,
			});
			$localstorage.setObject('broker', data.user.broker);

			$state.go("app.dashboard")		
		}).catch(function(data){
			$ionicPopup.alert({
				title: 'Login Failed',
				template: 'The email and password is not accepted.'
			}).then(function(res) {
				$scope.signingUp = true;
			});		
		});
	}


}]);