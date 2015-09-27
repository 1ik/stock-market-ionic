angular.module('app.services')

.service('settingsService', ['httpUtils', "$q", "constants", "$window", "$localstorage",
	function(httpUtils, $q, constants, $window, $localstorage){
		// rootURL = constants.rootURL;
		var mock = constants.mock;
		return {
			getAlertSettings: function() {
				var reqUrl = constants.rootURL + 'api_users/settings';
				return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;
			},
			removeSettings: function(settings) {
				var reqUrl = constants.rootURL + 'api_users/destroySettings/' + settings.id;
				return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;
			}
		};
}])
