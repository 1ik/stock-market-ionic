angular.module('app.controllers').controller(
	'FTsController', ['$scope', 'ftService','$state', '$ionicPopup', function($scope, ftService, $state, $ionicPopup){
		
		if ($state.current.name == 'app.ft.view') {
			ftService.getFTRequests().then(function(fts){
				$scope.fts = fts;
			});
		}

		$scope.ft = {
			requestedAmount: 0,
			collectionPoint: '',
			type: ''
		};

		$scope.collectionPoints = [
			{name: "Head Office", value: "head_office"},
			{name: "Dhanmondi Branch", value: "dhanmondi_branch"},
			{name: "Banani Branch", value: "banani_branch"},
		];

		$scope.types = [
			{name: "Direct Transfer", value: "direct_transfer"},
			{name: "Cheque Requisition", value: "cheque_requisition"},
			{name: "Transfer To IPO", value: "transfer_to_ipo"}
		];

		$scope.submit = function() {
			ftService.sendFTReq($scope.ft).then(function(d){
				var alertPopup = $ionicPopup.alert({
					title: 'Fund Transfer Successful',
					template: 'Your Fund Transfer request has been accepted.'
				}).then(function(){
					$state.go("app.ft.view");
				});
			});
		}
}]);