angular.module('app.controllers').controller(
	'ManageOrderController', ['$scope', 'ordersService', function($scope, ordersService){
		$scope.actions = ['buy', 'sell'];
		$scope.order = {
			action : 'buy'
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
}]);