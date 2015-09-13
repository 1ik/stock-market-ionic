angular.module('app.services')

.service('profileService', ['httpUtils', '$http', "$q", "constants","$localstorage", function(httpUtils, $http, $q, constants,$localstorage){
	
	return {

		getKSCLUserProfile : function() {
			var reqUrl = constants.rootURL + 'api_users/profile';
			return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;
		}

	};
}])
