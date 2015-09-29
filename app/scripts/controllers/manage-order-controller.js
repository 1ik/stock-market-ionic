angular.module('app.controllers').controller(
	'ManageOrderController', ['$scope', 'ordersService', '$ionicPopup', '$state',
	function($scope, ordersService, $ionicPopup, $state){
		$scope.actions = ['buy', 'sell'];
		
		$scope.order = {
			type : 'buy',
			checkMarketPrice: false
		};

		$scope.companySearching = false;

		$scope.$watch('order.type',function(val){
			fetchCompanies(val);
		});

		$scope.$watch('order', function(newVal,oldVal){
			$scope.order.totalMinPrice = $scope.order.quantity * $scope.order.minRange;
			$scope.order.totalMaxPrice = $scope.order.quantity * $scope.order.maxRange;
		},true);

		var fetchCompanies = function(type) {
			$scope.companySearching = true;
			ordersService.getCompanies(type).then(function(companies){
				$scope.companies = companies;
				$scope.companySearching = false;
			});
		}

		$scope.save = function() {
			ordersService.saveOrder($scope.order).then(function(data) {
				console.log(data);
				return;
				$ionicPopup.alert({
					title: 'Order Saved!',
					template: 'Your Order has been saved sucessfully!'
				}).then(function(d){
					$state.go('app.orders.view')
				});
			})
		}
}]);