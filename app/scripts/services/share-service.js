angular.module('app.services')

.service('shareService', ['httpUtils', '$http', "$q", "constants","$localstorage", function(httpUtils, $http, $q, constants,$localstorage){
	
	return {
		getRecentDisclosure: function() {
			var reqUrl = constants.rootURL + 'api_dse/getRecentDisclosure';
			return httpUtils.get(reqUrl, {}, {}).promise;
		},
		
		getKSCLUserProfile : function() {
			var reqUrl = constants.rootURL + 'api_users/profile';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},
	};
}])
