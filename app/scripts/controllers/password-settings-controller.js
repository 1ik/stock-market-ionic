angular.module('app.controllers').controller(
	'PasswordSettingsController', ['$scope', '$ionicPopup', 'profileService', function($scope, $ionicPopup, profileService){
		$scope.password = {
			currentPass: "",
			newPass: "",
			confirmPass: ""
		}
		
		$scope.submitPassChange = function() {
			var message = "";
			
			if($scope.password.newPass != $scope.password.confirmPass) {
				message = "The confirm password and new password field has to be same";
			}
			if($scope.password.newPass.length < 4) {
				message = "Please choose a password with at least 4 characters";	
			}
			if($scope.password.currentPass == "") {
				message = "Please enter your current password";
			}
			
			if(message != "") {
				$ionicPopup.alert({
					title: 'Invalid submission',
					template: message
				}).then(function(res) {
					$scope.withdrawal = {};
				});
				return false;
			}

			profileService.changePassword($scope.password).then(function(data){
				console.log(data);
				$scope.password = {
					currentPass: "",
					newPass: "",
					confirmPass: ""
				}
				if(data.status == true) {
					$ionicPopup.alert({
						title: 'Password Change Successful',
						template: "Your password has been changed successfully"
					});
				} else {
					$ionicPopup.alert({
						title: 'Password Change Failed',
						template: "Your current password is not correct"
					});
				}
			});

		}
}]);