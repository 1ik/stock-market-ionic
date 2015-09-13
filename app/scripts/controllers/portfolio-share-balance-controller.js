angular.module('app.controllers')
	.controller('portfolioShareBalanceController', ['$scope','portfolioService','$ionicPopup','$state', function($scope, portfolioService, $ionicPopup, $state){

		portfolioService.getShareBalance().then(function(data){
			$scope.shareBalances = data.share_balance;
			$scope.error = false;
		}).catch(function(data){
			$scope.error = true;
		});

		$scope.marketVal = function(ycp , balance) {
			if(ycp == null) {
				ycp = 0;				
			}
			return parseFloat(ycp) + parseFloat(balance);
		}

	}]);