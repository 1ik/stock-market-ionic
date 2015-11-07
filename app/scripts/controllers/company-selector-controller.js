angular.module('app.controllers')
.controller('companySelectorController', ['$scope', 'companyService', function($scope, companyService){
	//should look after the whole application.
	$scope.title = "Select Company";
	$scope.search = {
		companyName: ""
	};

	$scope.$watch('search.companyName', _.debounce(function(companyName) {
		$scope.title = "Fetching Companies...";
		companyService.getCompanies(companyName).then(function(companies){
			$scope.title = "Select Company";
			console.log(companies);
			$scope.companies = companies;
		}).catch(function(error){
			$scope.title = "Select Company";
		});
	},700));

}]);