angular.module('app.services')

.service('authService', ['$http', "$q", "constants", function($http, $q, constants){
	
	return {
		
		authenticateUser: function(email, password) {
			var reqUrl = constants.rootURL + 'auth/login';
			var params = {
				'email' : 'email',
				'password': 'password'
			};
			
			var req = 
			{
			    method: 'POST',
			    url: "http://ksclbd.com/api/index.php/auth/login",
			    data: 'email=foo@bar.com&password=correct',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}

			$http(req).
			success(function(data, status, headers, config) 
			{
			    alert(data);
			}).
			error(function(data, status, headers, config) 
			{
			    alert(data);
			});
		}
	};
}])
