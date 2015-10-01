angular.module('app.controllers').controller(
	'IpoWithdrawalController', ['$scope', '$localstorage', 'ipoService', '$ionicPopup', function($scope, $localstorage, ipoService, $ionicPopup){		
		$scope.user = $localstorage.getObject('userData').user;
		$scope.withdrawal = {};
		$scope.submitting = false;
		$scope.fromDatepickerObject = {
			titleLabel: 'Select Date',  //Optional
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
					$scope.withdrawal.request_date = val.getFullYear() + "-" + (val.getMonth()+1) + "-" + val.getDate();
				}
			}
		};

		$scope.submit = function() {
			$scope.submitting = true;
			ipoService.saveWithdrawalReq($scope.withdrawal).then(function(resp){
				$scope.submitting = false;
				$ionicPopup.alert({
					title: 'Withdrawal Request Submitted successfully',
					template: 'Your withdrawal request have been submitted successfully.'
				}).then(function(res) {
					$scope.withdrawal = {};
				});
			});
		}
}]);