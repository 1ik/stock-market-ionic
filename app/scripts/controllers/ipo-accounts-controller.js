angular.module('app.controllers').controller(
	'IpoAccountsController', ['$scope','ipoService', function($scope, ipoService){
		ipoService.getChildAccounts().then(function(data){
			$scope.childAccounts = data;
		});
}]);