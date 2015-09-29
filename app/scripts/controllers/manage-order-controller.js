angular.module('app.controllers').controller(
	'ManageOrderController', ['$scope', 'ordersService', '$ionicPopup', '$state', '$rootScope',
	function($scope, ordersService, $ionicPopup, $state, $rootScope) {

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
			var date = new Date();
			$scope.order.submissionDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
			ordersService.saveOrder($scope.order).then(function(data) {
				console.log(data);
				return;
				$ionicPopup.alert({
					title: 'Order Saved!',
					template: 'Your Order has been saved sucessfully!'
				}).then(function(d){
					$state.go('app.orders.view')
				});
			})
		}
}]);