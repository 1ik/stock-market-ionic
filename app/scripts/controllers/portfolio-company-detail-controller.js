angular.module('app.controllers').controller(
	'portfolioCompanyDetailController', ['$localstorage', '$scope', '$stateParams', 'portfolioService', '$ionicPopup',
	function($localstorage, $scope, $stateParams, portfolioService, $ionicPopup){
		$scope.loadingText = " (Loading...)";
		$scope.title = "DETAIL OF " + $stateParams.company + $scope.loadingText;
		$scope.details = $localstorage.getObject('detail.' + $stateParams.company).details;

		$scope.loading = true;
		portfolioService.getCompanyDetail($stateParams.company).then(function(details) {
			$scope.loadingText = "";
			$scope.title = "DETAIL OF " + $stateParams.company + $scope.loadingText;

			$scope.loading = false;
			$scope.details = details;
			$localstorage.setObject('detail.' + $stateParams.company, {details: details});
		});

		$scope.openDetail = function(detail) {
			$ionicPopup.alert({
				title: detail.transection_date,
				template: '<div class="item">
	            <b>Sale Quanity :</b> '+detail.sale_quantity+'
	          </div><div class="item">
	            <b>Total Sell Amount :</b> '+detail.total_sell_amount+'
	          </div><div class="item">
	            <b>Balance Quantity :</b><br/>'+detail.balance_quantity+'
	          </div><div class="item">
	            <b>Remarks:</b><br/>'+ detail.remark +'
	          </div>'
			});
		}

}]);