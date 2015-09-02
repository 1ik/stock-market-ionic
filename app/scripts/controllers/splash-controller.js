angular.module('app.controllers',['ionic-utils'])
.controller('SplashController', ['$scope','$http',function($scope){
		//code
		//user stays here for 2,3 seconds then redirect to state, 'app.dashboard'.
	

	$scope.submitForm = function(email, password, signingUp){
		host = 'http://demo5829846.mockable.io/users/';
		$scope.user = {email: email , password: password};
		$scope.message = '';
		console.log(email)

		$http.post(host+'/users', $scope.user)
			.success(function (data, status, headers, config) {
				$window.sessionStorage.token = data.token;
				console.log('status '+status)
				$scope.message = 'Welcome';
			})
			.error(function (data, status, headers, config) {
				// Erase the token if the user fails to log in
				delete $window.sessionStorage.token;
				console.log('error '+status)
				// Handle login errors here
				$scope.message = 'Error: Invalid user or password';
			});
	}
}]);