angular.module('app.controllers')
	.controller('portfolioStatusController', ['$scope','portfolioService','$ionicPopup', function($scope, portfolioService, $ionicPopup){

		$scope.status = null;
		portfolioService.getStatus().then(function(data){
			$scope.status = data;
		}).catch(function(data){
			var alertPopup = $ionicPopup.alert({
				title: 'Failed to get portfolio status',
				template: 'Could not get data from the server'
			});
		});
	
	}]);