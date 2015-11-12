angular.module('app.controllers')
.controller('companySelectorController', ['$scope', 'companyService','$localstorage', function($scope, companyService, $localstorage){
	//should look after the whole application.
	$scope.title = "Select Company";
	$scope.search = {
		companyName: ""
	};

	setTimeout(function(){
		$scope.companies = $localstorage.getObject('marketInfo').marketInfo;
		$scope.source = $localstorage.getObject('marketInfo').marketInfo;

		$scope.title = "Getting Companies...";
		companyService.getCompanies("").then(function(companies){
			$scope.title = "Select Company";
			$scope.companies = companies;
			$scope.source = companies;
		});

		$scope.$watch('search.companyName', function(newV){
			companyName = newV.toLowerCase();

			$scope.companies = _.reject($scope.source, function(cmp){
				return cmp.company.toLowerCase().indexOf(companyName) < 0;
			})
		});	
	},800);
	
}]);