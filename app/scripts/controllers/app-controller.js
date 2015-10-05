angular.module('app.controllers')
.controller('appController', ['$scope', '$rootScope', '$window', 'pushService', 
	'$state', '$ionicPopup', '$localstorage',
	function($scope, $rootScope, $window, pushService, $state, $ionicPopup, $localstorage) {
		
		$scope.user = $localstorage.getObject('userData').user;

		$scope.logout =  function() {
			$state.go("splash",{},{reload: true});
			$window.location.reload(true);
		}

		$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
			switch(notification.event) {
				
				case 'registered':
					var pushRegistration = '';

					if($window.localStorage['pushRegistration'] != undefined) {
						pushRegistration = JSON.parse($window.localStorage['pushRegistration']);						
					} else {
						pushRegistration = {
							remote : {
								android: { device_token : ''},
								ios : {device_token: ''}
							},
							local : {
								android: { device_token : ''},
								ios : {device_token: ''}	
							}
						};
					}
					
					pushRegistration.remote.android.device_token = notification.regid;					
					
					if (notification.regid.length > 0 ) {
						if(pushRegistration.remote.android.device_token 
							!= pushRegistration.local.android.device_token) {
							pushService.sendRegistrationToServer({
								deviceId: notification.regid,
								deviceType: "gcm"
							}).then(function(response){
								pushRegistration.local.android.device_token = notification.regid;
								$window.localStorage['pushRegistration'] = JSON.stringify(pushRegistration);
							}).catch(function(err){});
						}
					}
					break;
				
				case 'message':
					pushService.saveNotification(notification.payload);
					/*
					$ionicPopup.alert({
						title: notification.payload.title,
						template: notification.payload.message
					});
					*/
					alert(notification.payload.title + " : " + notification.payload.message);
					break;

				default:
					break;
			}
		});

}]);