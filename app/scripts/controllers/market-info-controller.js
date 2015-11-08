angular.module('app.controllers').controller(
	'MarketInfoController', ['$scope', 'companyService', function($scope, companyService){
		$scope.search = {
			companyName: ""
		}

		var searchCompany = function(companyName) {
			companyService.getCompanies(companyName).then(function(data){
				$scope.companies = data;
				console.log(data);
			});
		}

		$scope.$watch('search', function(newV,oldV){
			searchCompany(newV.companyName);
		},true)
		
}]);