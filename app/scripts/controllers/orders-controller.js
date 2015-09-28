angular.module('app.controllers').controller(
	'OrdersController', ['$scope', 'ordersService', function($scope, ordersService){
		$scope.companies = ["select"];
		
		$scope.search = {
			company: "select"
		};

		ordersService.getOrders({}).then(function(orders){
			$scope.orders = orders;
			_.each(orders, function(order){
				if($scope.companies.indexOf(order.company) == -1) {
					$scope.companies.push(order.company);
				}
			})
		});

		$scope.$watch('search.company', function(val){
			if(val != 'select') {
				doSearch();
			}
		});

		var doSearch = function() {
			ordersService.getOrders($scope.search).then(function(orders){
				$scope.orders = orders;
			});
		}

}]);