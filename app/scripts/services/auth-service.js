angular.module('app.services')

.service('authService', ['httpUtils', '$http', "$q", "constants", function(httpUtils, $http, $q, constants){
	
	return {
		
		authenticateUser: function(email, password) {
			var reqUrl = constants.rootURL + 'api_auth/login';
			var params = 'email='+email+'&password='+password;
			
			return httpUtils.post(reqUrl,params).promise;
		},
		
		registerUser: function(data) {
			var reqUrl = constants.rootURL + 'api_auth/register';
			var params = 'user_email='+data.email+'&user_password='+data.password+'&name='+data.name+'&phone='+data.phone;

			return httpUtils.post(reqUrl, params).promise;
		}
	};
}])
