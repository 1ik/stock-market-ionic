angular.module('app.controllers')
	.controller('portfolioStatusController', ['$scope','portfolioService','$ionicPopup', '$localstorage',
		function($scope, portfolioService, $ionicPopup, $localstorage){

		$scope.loading = true;
		$scope.status = $localstorage.getObject('portfolioStatus');

		portfolioService.getStatus().then(function(data){
			$scope.loading = false;

			$localstorage.setObject('portfolioStatus', data);
			$scope.status = data;
		}).catch(function(data){
			var alertPopup = $ionicPopup.alert({
				title: 'Failed to get portfolio status',
				template: 'Could not get data from the server'
			});
		});
	
	}]);