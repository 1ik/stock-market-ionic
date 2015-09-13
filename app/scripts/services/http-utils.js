angular.module('app.services')

.service('httpUtils', ['$http', "$q", "constants", function($http, $q, constants){
	
	return {
		post: function(reqUrl , params, additionalHeaders) {
			$headers = {'Content-Type': 'application/x-www-form-urlencoded'}
			//add additional headers if any given
			if(additionalHeaders) angular.extend($headers, additionalHeaders);

			var req = 
			{
			    method: 'POST',
			    url: reqUrl,
			    data: params,
			    headers: $headers
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
		},
		get: function(reqUrl , params, additionalHeaders) {
			$headers = {}
			if(additionalHeaders) angular.extend($headers, additionalHeaders);
			// console.log($headers)
			var req = 
			{
			    method: 'POST',
			    url: reqUrl,
			    data: params,
			    headers: $headers
			}

			var dfd = $q.defer();

			$http(req).
			success(function(data, status, headers, config) 
			{
				// console.log('success :'+JSON.stringify(data))
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
