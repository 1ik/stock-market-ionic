angular.module('app.controllers').controller(
	'ReqInfoController', ['$scope','reqInfoService','$ionicPopup', '$localstorage', '$state', function($scope,reqInfoService,$ionicPopup, $localstorage,$state){
		
		$scope.request_infos = $localstorage.getObject('reqInfos').info || [];
		
		$scope.submitting = false;

		$scope.loading = false;
		$scope.fetchInfos = function() {
			$scope.loading = true;
			reqInfoService.getReqInfos().then(function(d){
				$scope.loading = false;
				$scope.request_infos = d;
				$localstorage.setObject('reqInfos', {info:d});
			});
		}
		$scope.fetchInfos();

		$scope.reqInfo = {
			subject: '',
			body: '',
			accountChange: 0
		};

		$scope.submit = function() {
			msg = '';	
			if($scope.reqInfo.subject.length < 4) {
				msg = "Please put appropriate subject (at least 4 letters)";
			}

			if($scope.reqInfo.body.length < 4) {
				msg = "Please put appropriate body (at least 4 letters)";
			}

			if(msg) {
				$ionicPopup.alert({
					title: 'Invalid request information.',
					template: msg
				});
				return;	
			}
			
			$scope.submitting = true;
			reqInfoService.saveNewReqInfo($scope.reqInfo).then(function(data){
				$scope.submitting = false;
				$ionicPopup.alert({
					title: 'Request accepted',
					template: 'Your Request for information has been saved and will be reviewed.'
				});
				$scope.reqInfo = {
					accountChange: 0
				};
			});
		};

		$scope.goToNewReq = function(){
			$state.go('app.requestInformation.create')
		}
}]);