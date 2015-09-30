angular.module('app.controllers').controller(
	'FTsController', ['$scope', 'ftService', function($scope, ftService){
		ftService.getFTRequests().then(function(fts){
			console.log(fts);
			$scope.fts = fts;
		});
}]);