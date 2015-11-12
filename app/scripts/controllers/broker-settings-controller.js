angular.module('app.controllers').controller(
	'BrokerSettingsController', ['$scope','settingsService', '$ionicPopup', function($scope, settingsService, $ionicPopup){
		$scope.broker = settingsService.getBroker() || {};

		$scope.submit = function() {
			message = '';
			
			if($scope.broker.broker_name == '') {
				message = "Please enter valid broker name";
			}
			
			if($scope.broker.comission == null || $scope.broker.comission == undefined || $scope.broker.comission <= 0 || $scope.broker.comission > 100) {
				message = "Please enter valid broker comission";
			}

			if(message) {
				var alertPopup = $ionicPopup.alert({
					title: 'Invalid form',
					template: message
				});
				return;
			}

			settingsService.updateBroker($scope.broker).then(function(data){
				var alertPopup = $ionicPopup.alert({
					title: 'Broker saved successfully',
					template: 'Your Broker informations have been saved successfully!.'
				});
			});
		}
}]);