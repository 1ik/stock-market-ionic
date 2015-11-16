angular.module('app.controllers').controller(
	'IpoReportController', ['$scope', 'ipoService', '$localstorage', function($scope, ipoService,$localstorage){
		$scope.ipoSessions = $localstorage.getObject('userData').user.ipo_session_list;
		
		$scope.selected = {
			session: $scope.ipoSessions[0]
		};

		$scope.$watch('selected', function(newV){ doSearch() },true);

		var doSearch = function(){
			if(!$scope.selected.session) {
				return;
			} 
			$scope.loading = true;
			ipoService.getIpoReports({ipo_Session_id: $scope.selected.session.id}).then(function(data){
				$scope.loading = false;
				$scope.reports = data;
				$scope.reports.appliedIpoList.unshift(data.userAppliedIpo);
				// $scope.reports.appliedIpoList.push({
				// 	Application_Date: '2015-11-14',
				// 	id: '33',
				// 	IPOSession_Name: 'ABDEW',
				// 	Application_Satus: 'Pending',
				// 	Remarks: 'sd sd4',
				// }); 
			});
		}

}]);