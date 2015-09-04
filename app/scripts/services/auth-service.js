angular.module('app.services')

.service('authService', ['httpUtils', '$http', "$q", "constants", function(httpUtils, $http, $q, constants){
	
	return {
		
		authenticateUser: function(email, password) {
			var reqUrl = constants.rootURL + 'auth/login';
			var params = 'email='+email+'&password='+password;
			
			return httpUtils.post(reqUrl,params).promise;
		}
	};
}])
