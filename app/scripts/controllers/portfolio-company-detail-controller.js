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
	            <b>Balance Quanity :</b> '+detail.balance_quantity+'
	          </div>'
			});
		}

		$scope.formatDate = function(date) {
			formatted = moment(new Date(date)).format("DD/MMM/YYYY");
			return formatted;
		}

}]);