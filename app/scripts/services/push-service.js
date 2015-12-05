angular.module('app.services')
.service('pushService', ['httpUtils', '$http', "$q", "constants", '$window', '$cordovaPush', '$localstorage',
	function(httpUtils, $http, $q, constants, $window, $cordovaPush, $localstorage){
	
	return {		
		sendRegistrationToServer: function(data) {

			var reqUrl = constants.rootURL + 'api_users/device';
			var	params = 'device_id='+data.deviceId+'&device_type='+data.deviceType;			
			return httpUtils.post(reqUrl, params,{'Token':$localstorage.getObject('userData').token}).promise;
		},

		saveNotification: function (notification) {
			var notices = $window.localStorage['pushNotifications'] || '[]';
			notices = JSON.parse(notices);
			notices.unshift(notification);

			$window.localStorage['pushNotifications'] = JSON.stringify(notices);
		},

		/**
		* Sends a Registration request for device to APN/GCM server
		*/
		register: function() {
			//register for android
			if(ionic.Platform.isAndroid()) {
				$cordovaPush.register({"senderID": "707198023393"}).then(function(result) {
					//registration success.
				});
			} else {
				
				if(ionic.Platform.isIOS()) {

					var iosConfig = {
						"badge": true,
						"sound": true,
						"alert": true,
					};

					$cordovaPush.register(iosConfig).then(function(deviceToken) {
						console.log("device token", deviceToken);
						var reqUrl = constants.rootURL + 'api_users/device';
						var	params = 'device_id='+deviceToken+'&device_type=apn';
						httpUtils.post(reqUrl, params,{'Token':$localstorage.getObject('userData').token}).promise;
				    }, function(err) {
				    });
				}
			}
		},
		
		getNotifications: function() {
			var notifications = [];
			
			if($window.localStorage['pushNotifications'] != undefined) {
				notifications = JSON.parse($window.localStorage['pushNotifications']);
			}

			return notifications;
		}
	};
}])
