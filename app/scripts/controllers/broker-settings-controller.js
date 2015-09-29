angular.module('app.controllers').controller(
	'BrokerSettingsController', ['$scope','settingsService', '$ionicPopup', function($scope, settingsService, $ionicPopup){
		$scope.broker = settingsService.getBroker() || {};

		$scope.submit = function() {
			settingsService.updateBroker($scope.broker).then(function(data){
				var alertPopup = $ionicPopup.alert({
					title: 'Broker saved successfully',
					template: 'Your Broker informations have been saved successfully!.'
				});
			});
		}
}]);