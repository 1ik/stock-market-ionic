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
			
			createNewSettings: function(settings) {
				settings.type = $localstorage.getObject('userData').user.kscl? 'kscl' : 'nonkscl';
				var reqUrl = constants.rootURL + 'api_users/create_settings';
				var params = $.param(settings);
				return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
			},

			updateAlertSetting: function(settings) {
				var reqUrl = constants.rootURL + 'api_users/update_settings';
				var params = $.param(settings);
				return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
			},
			
			removeSettings: function(settings) {
				var reqUrl = constants.rootURL + 'api_users/destroySettings/' + settings.id;
				return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;
			},

			updateBroker: function(settings) {
				var reqUrl = constants.rootURL + 'api_users/update_broker';
				var params = $.param(settings);
				$localstorage.setObject('broker', settings);
				return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
			},

			getBroker: function() {
				return $localstorage.getObject('broker');
			}
		};
}])
