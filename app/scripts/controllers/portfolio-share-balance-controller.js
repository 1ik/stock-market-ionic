angular.module('app.controllers')
	.controller('portfolioShareBalanceController', ['$scope','portfolioService','$ionicPopup','$state',
		function($scope, portfolioService, $ionicPopup, $state){
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

		$scope.openShare = function(shareBalance) {
			console.log(shareBalance);
			$ionicPopup.alert({
				title: shareBalance.company,
				template: '<div class="item">
	            <b>Quantity :</b> '+shareBalance.balance+'
	          </div><div class="item">
	            <b>Buy Average :</b> '+shareBalance.buy_average_value+'
	          </div><div class="item">
	            <b>Breakeven Average :</b><br/>'+shareBalance.breakeven_average+'
	          </div><div class="item">
	            <b>Breakeven Average :</b><br/>'+shareBalance.balance * shareBalance.buy_average_value+'
	          </div><div class="item">
	            <b>YCP :</b><br/>'+shareBalance.ycp+'
	          </div>'
			});
		}

	}]);