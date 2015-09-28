angular.module('app.controllers').controller(
	'ManageOrderController', ['$scope', 'ordersService', '$ionicPopup', '$state',
	function($scope, ordersService, $ionicPopup, $state){
		$scope.actions = ['buy', 'sell'];
		$scope.order = {
			type : 'buy',
			checkMarketPrice: false
		};

		$scope.companySearching = false;

		$scope.$watch('order.action',function(val){
			fetchCompanies(val);
		});

		var fetchCompanies = function(type) {
			$scope.companySearching = true;
			ordersService.getCompanies(type).then(function(companies){
				$scope.companies = companies;
				$scope.companySearching = false;
			});
		}

		$scope.save = function() {
			ordersService.saveOrder($scope.order).then(function(data){
				$ionicPopup.alert({
					title: 'Order Saved!',
					template: 'Your Order has been saved sucessfully!'
				}).then(function(d){
					$state.go('app.orders.view')
				});
			})
		}
}]);