angular.module('app.services')

.service('companyService', ['httpUtils', '$http', "$q", "constants", function(httpUtils, $http, $q, constants){
	
	return {
		getCompanies : function(companyName) {
			var dfd = $q.defer();
			
			$http.get(constants.rootURL + 'api_info/markets?company=' + companyName).success(function(data){
				dfd.resolve(data);
			}).error(function(data){
				dfd.reject({
					"error" : "Failed to fetch companyies :("
				});
			});

			return dfd.promise;
		}
	};
}])
