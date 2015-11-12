angular.module('app.controllers').controller(
	'FTsController', ['$scope', 'ftService','$state', '$ionicPopup', '$cordovaNetwork', '$localstorage',
	function($scope, ftService, $state, $ionicPopup, $cordovaNetwork, $localstorage){

		
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
		$scope.loading = true;

		ftService.accountDetails().then(function(data){
			$scope.loading = false;
			$scope.extraInfo = data;
		});

		$scope.fts = $localstorage.getObject('fts').fts;
		if ($state.current.name == 'app.ft.view') {
			ftService.getFTRequests().then(function(fts){
				$scope.fts = fts;
				$localstorage.setObject('fts', {fts:fts});
			});
		}
		
		$scope.collectionPoints = [
			{name: "Head Office", value: "head_office"},
			{name: "Dhanmondi Branch", value: "dhanmondi_branch"},
			{name: "Banani Branch", value: "banani_branch"},
		];

		$scope.ft = {
			collection_point: '',
			type: ''
		};

		$scope.types = [
			{name: "Direct Transfer (EFT)", value: "direct_transfer"},
			{name: "Cheque Requisition", value: "cheque_requisition"},
			{name: "Transfer To IPO", value: "transfer_to_ipo"}
		];

		$scope.submit = function() {
			message = '';
			if($scope.ft.requested_amount == undefined || $scope.ft.requested_amount == null) {
				message = 'Please put correct request amount';
			}

			if($scope.ft.type == '') {
				message = 'Please select correct transfer type';	
			}

			if($scope.ft.type == 'cheque_requisition') {
				if($scope.ft.collection_point == '') {
					message = 'Please select collection point';			
				}
			}

			if(message) {
				var alertPopup = $ionicPopup.alert({
					title: 'Fund Transfer Successful',
					template: message
				});
				return false;
			}


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