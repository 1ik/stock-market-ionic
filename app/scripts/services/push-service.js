angular.module('app.services')

.service('pushService', ['httpUtils', '$http', "$q", "constants", function(httpUtils, $http, $q, constants){
	
	return {		
		registerDevice: function(data) {
			var reqUrl = constants.rootURL + 'api_users/device';
			var params = null;
			if(data.appleDeviceId){
				params = 'apple_device_id='+data.appleDeviceId;
			}
			if(data.gcmDeviceId){
				params = 'gcm_device_id='+data.gcmDeviceId;
			}
			

			return httpUtils.post(reqUrl, params,{'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
