angular.module('app.services')

.service('alertService', ['httpUtils', '$http', "$q", "constants",'$localstorage', function(httpUtils, $http, $q, constants, $localstorage){
	// rootURL = constants.rootURL;
	var mock = constants.mock;
	return {
		getAlerts: function() {

			var reqUrl = constants.rootURL + 'api_users/setShareBalance';
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;

		}
	};
}])
