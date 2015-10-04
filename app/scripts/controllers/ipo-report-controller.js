angular.module('app.controllers').controller(
	'IpoReportController', ['$scope', 'ipoService', function($scope, ipoService){
		ipoService.getIpoReports({"ipo_Session_id":14}).then(function(data){
			console.log(data);
			$scope.reports = data;
		});

}]);