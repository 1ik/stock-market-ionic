angular.module('app.services')

.service('profileService', ['httpUtils', '$http', "$q", "constants","$localstorage", function(httpUtils, $http, $q, constants,$localstorage){
	
	return {

		getKSCLUserProfile : function() {
			var reqUrl = constants.rootURL + 'api_users/profile';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		changePassword: function(data) {
			var reqUrl = constants.rootURL + 'api_users/change_password';
			var params = $.param(data);
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
