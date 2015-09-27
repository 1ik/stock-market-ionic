angular.module('app.controllers')
.controller('SplashController', ['$scope','$http', 'authService', '$ionicModal', '$ionicPopup', '$state','$localstorage','pushService', 
	function($scope, $http, authService, $ionicModal, $ionicPopup, $state, $localstorage, pushService){

	$scope.form = {
		email : 'test3@mail.com',
		password: 'test3'
	};

	$scope.submitForm = function(email, password, signingUp) {

		if(signingUp) {
			authService.registerUser($scope.form).then(function(data){			
				var alertPopup = $ionicPopup.alert({
					title: 'Registration Successful',
					template: 'You have registered successfully. Please log in to continue.'
				});
				//save token in the app

				alertPopup.then(function(res) {
					$scope.signingUp = false;
				});


			}).catch(function(data){
				
				var alertPopup = $ionicPopup.alert({
					title: 'Registration Failed',
					template: 'The email address was incorrect or it already exists.'
				});

				alertPopup.then(function(res) {
					$scope.signingUp = true;
				});

			});
			return false;
		}

		authService.authenticateUser(email,password).then(function(data) {
			
			pushService.register();
			
			$localstorage.setObject('userData', { token: data.token, user: data.user });			
//			var device = $localstorage.getObject('device');
            //pushService.registerDevice({deviceId: device.id, deviceType: device.type}) //leaving out ios option atm
			//login success
			$state.go("app.dashboard")
		}).catch(function(data){
			
			var alertPopup = $ionicPopup.alert({
				title: 'Login Failed',
				template: 'The email and password is not accepted.'
			});

			alertPopup.then(function(res) {
				$scope.signingUp = true;
			});
		});
	}


}]);