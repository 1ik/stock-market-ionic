angular.module('app.services')

.service('httpUtils', ['$http', "$q", "constants", function($http, $q, constants){
	
	return {
		post: function(reqUrl , params) {
			var req = 
			{
			    method: 'POST',
			    url: reqUrl,
			    data: params,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}

			var dfd = $q.defer();

			$http(req).
			success(function(data, status, headers, config) 
			{
			    dfd.resolve(data);
			}).
			error(function(data, status, headers, config) 
			{
			    dfd.reject(data);
			});

			return dfd;
		}
	};
}]);
