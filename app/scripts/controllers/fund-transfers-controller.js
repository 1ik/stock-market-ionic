angular.module('app.controllers').controller(
	'FTsController', ['$scope', 'ftService','$state', '$ionicPopup', '$cordovaNetwork',
	function($scope, ftService, $state, $ionicPopup, $cordovaNetwork){
		
		if(ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
			if(!$cordovaNetwork.isOnline()) {
				$ionicPopup.alert({
					title: 'You are offline',
					template: 'Please check your internet connection and come back.'
				}).then(function(d){
					$state.go('app.orders.view')
				});
			}
		}

		if ($state.current.name == 'app.ft.view') {
			ftService.getFTRequests().then(function(fts){
				$scope.fts = fts;
			});
		}

		$scope.ft = {
			requested_amount: 0,
			collection_point: '',
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

		$scope.goToTransferFunds = function() {
			$state.go('app.ft.request');		
		}
}]);