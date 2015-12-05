angular.module('app.controllers')
.controller('appController', ['$scope', '$rootScope', '$window', 'pushService', 
	'$state', '$ionicPopup', '$localstorage','$ionicPlatform',
	function($scope, $rootScope, $window, pushService, $state, $ionicPopup, $localstorage, $ionicPlatform) {

		// screen.lockOrientation('landscape');
		$rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
			var alertPopup = $ionicPopup.alert({
				title: 'Whoops You are Offline',
				template: 'Your device seems not to be connected to internet. Please check your connection.'
			}).then(function(){
				ionic.Platform.exitApp();
			});
		})
		
		$scope.user = $localstorage.getObject('userData').user;

		$scope.logout =  function() {
			$state.go("splash",{},{reload: true});
			setTimeout(function(){
				$window.location.reload(true);
			},1000);
		}

		$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
			console.log(notification, 'app-controller');

			switch(notification.event) {
				
				case 'registered':
				
					pushService.sendRegistrationToServer({
						deviceId: notification.regid,
						deviceType: "gcm"
					}).then(function(response){
					}).catch(function(err){});
				
					break;				
				
				case 'message':
					if(ionic.Platform.isAndroid()) {
						notification = notification.payload;
					}
					
					pushService.saveNotification(notification);					
					$ionicPopup.alert({
						title: notification.title,
						template: notification.message
					});

					break;

				default:
					break;
			}
		});

}]);