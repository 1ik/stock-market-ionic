angular.module('app.controllers')
	.controller('portfolioShareBalanceController', ['$scope','portfolioService','$ionicPopup','$state', '$localstorage',
		function($scope, portfolioService, $ionicPopup, $state, $localstorage){
		
		$scope.shareBalances = $localstorage.getObject('shareBalances').shbs;

		$scope.updating = true;
		portfolioService.getShareBalance().then(function(data){
			$scope.updating = false;
			$scope.shareBalances = data.share_balance;
			$localstorage.setObject('shareBalances', {shbs:data.share_balance});

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

		$scope.buyVal = function(v1 , v2) {
			var val = v1 * v2;
			return val.toFixed(2);
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
	            <b>Buy Amount :</b><br/>'+shareBalance.balance * shareBalance.buy_average_value+'
	          </div><div class="item">
	            <b>Breakeven Average :</b><br/>'+shareBalance.breakeven_average+'
	          </div><div class="item">
	            <b>YCP :</b><br/>'+shareBalance.ycp+'
	          </div>'
			});
		}

		$scope.getBuyVal = function() {
			var val = $scope.shareBalance.balance * $scope.shareBalance.buy_average_value;
			return val.toFixed(2);
		}

		$scope.showCompanyDetail = function(company) {
			$state.go('app.portfolio.company_details', {company: company});
		}
	}]);