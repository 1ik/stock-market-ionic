angular.module('app.controllers').controller(
	'IpoAccountsController', ['$scope','ipoService', '$localstorage', function($scope, ipoService,$localstorage){
		$scope.loading = true;
		$scope.childAccounts = $localstorage.getObject('childAcc').childacc;

		ipoService.getChildAccounts().then(function(data){
			$scope.loading = false;
			$scope.childAccounts = data;
			$localstorage.setObject('childAcc', {childacc: data});
		});
}]);