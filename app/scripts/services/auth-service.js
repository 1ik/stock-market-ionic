angular.module('app.services')

.service('authService', ['$http', "$q", "constants", function($http, $q, constants){
	
	return {
		
		authenticateUser: function(email, password) {
			var dfd = $q.defer();
			var dfdCall = $http.post(constants.rootURL + 'auth/login', {
				'email': email,
				'password': password
			});

			dfdCall.success(function(data, status, headers, config){
				dfd.resolve(data);
			}).error(function(data, status, headers, config){
				dfd.reject(data);
			});

			return dfd.promise;
		}
	};
}])
