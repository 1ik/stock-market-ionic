angular.module('app.services')

.service('httpUtils', ['$http', "$q", "constants", function($http, $q, constants){
	
	return {
		request: function(reqUrl , params) {
			var req = 
			{
			    method: 'POST',
			    url: constants.rootURL + "auth/login",
			    data: params,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}
			var dfd = $q.defer();

			$http(req).
			success(function(data, status, headers, config) 
			{
				alert(data);
			    dfd.resolve(data);
			}).
			error(function(data, status, headers, config) 
			{
				alert(data);
			    dfd.reject(data);
			});

			return dfd.promise;
		}
	};
}]);
