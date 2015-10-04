angular.module('app.controllers').controller(
	'ReqInfoController', ['$scope','reqInfoService','$ionicPopup', function($scope,reqInfoService,$ionicPopup){
		
		$scope.request_infos = [];
		$scope.submitting = false;

		$scope.fetchInfos = function() {
			reqInfoService.getReqInfos().then(function(d){
				$scope.request_infos = d;
			});
		}
		$scope.fetchInfos();

		$scope.reqInfo = {
			accountChange: 0
		};

		$scope.submit = function() {
			$scope.submitting = true;
			reqInfoService.saveNewReqInfo($scope.reqInfo).then(function(data){
				$scope.submitting = false;
				$scope.request_infos.push(data);
				$ionicPopup.alert({
					title: 'Request accepted',
					template: 'Your Request for information has been saved and will be reviewed.'
				});
				$scope.reqInfo = {
					accountChange: 0
				};
			});
		};
}]);