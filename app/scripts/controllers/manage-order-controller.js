angular.module('app.controllers').controller(
	'ManageOrderController', ['$scope', 'ordersService', '$ionicPopup', '$state', '$rootScope', '$cordovaNetwork',
	function($scope, ordersService, $ionicPopup, $state, $rootScope, $cordovaNetwork) {
		
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
		
		$scope.actions = ['buy', 'sell'];
		$scope.expireDatepickerObject = {
			titleLabel: 'Select Expire Date',  //Optional
			todayLabel: 'Today',  //Optional
			closeLabel: 'Close',  //Optional
			setLabel: 'Set',  //Optional
			inputDate: new Date(),    //Optional
			setButtonType : 'button-assertive',  //Optional
			todayButtonType : 'button-assertive',  //Optional
			closeButtonType : 'button-assertive',  //Optional
			modalHeaderColor: 'bar-positive', //Optional
			modalFooterColor: 'bar-positive', //Optional
			callback: function (val) {    //Mandatory
				if (typeof(val) === 'undefined') {
					console.log('No date selected');
				} else {
					val = new Date(val);
					$scope.order.expiryDate = val.getFullYear() + "-" + (val.getMonth()+1) + "-" + val.getDate();
				}
			}
		};

		$scope.order = {
			type : 'buy',
			checkMarketPrice: false
		};

		$scope.companySearching = false;

		$scope.$watch('order.type',function(val){
			fetchCompanies(val);
			$scope.order.quantity = 0;
			$scope.order.minRange = 0;
			$scope.order.maxRange = 0;
		});

		$scope.$watch('order', function(newVal,oldVal){
			$scope.order.totalMinPrice = $scope.order.quantity * $scope.order.minRange;
			$scope.order.totalMaxPrice = $scope.order.quantity * $scope.order.maxRange;
		},true);

		var fetchCompanies = function(type) {
			$scope.companySearching = true;
			ordersService.getCompanies(type).then(function(companies){
				$scope.companies = companies;
				$scope.companySearching = false;
			});
		}

		$scope.save = function() {
			message = '';
			if($scope.order.quantity == undefined || $scope.order.quantity == null || $scope.order.quantity <= 0) {
				message = "Please enter correct order quantity";
			}

			if($scope.order.company == undefined) {
				message = "Please select a company";
			}

			if($scope.order.checkMarketPrice == false) {
				if($scope.order.minRange == undefined || $scope.order.maxRange == null) {
					message = "Please enter correct min range and max range"
				}
			}

			if(message) {
				$ionicPopup.alert({
					title: 'Invalid Order',
					template: message
				});
				return false;
			}
			console.log($scope.order);
			return false;

			var date = new Date();
			$scope.order.submissionDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
			ordersService.saveOrder($scope.order).then(function(data) {
				$ionicPopup.alert({
					title: 'Order Saved!',
					template: 'Your Order has been saved sucessfully!'
				}).then(function(d){
					$state.go('app.orders.view')
				});
			})
		}
}]);