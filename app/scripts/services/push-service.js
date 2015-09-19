angular.module('app.services')

.service('pushService', ['httpUtils', '$http', "$q", "constants", "$localstorage", function(httpUtils, $http, $q, constants,$localstorage){
	
	return {		
		registerDevice: function(data) {
			var reqUrl = constants.rootURL + 'api_users/device';
			var	params = 'device_id='+data.deviceId+'&device_type='+data.deviceType;

			return httpUtils.post(reqUrl, params,{'Token':$localstorage.getObject('userData').token}).promise;//oh got that from console
		},
		test: function(){
			alert('testing');
		}
	};
}])
